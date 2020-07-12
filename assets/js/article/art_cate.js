$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd;
    var indexEdit;
    var indexDel;
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                var htmlStr = template('tpl-table', res);
                $('#tbody').html(htmlStr);
            }
        })
    }

    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog_add').html(),
        })
    })

    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                layer.close(indexAdd);
                initArtCateList();
            }
        })
    })

    $('#tbody').on('click', '.btn_edit', function() {
        indexEdit = layer.open({
            title: '编辑文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog_edit').html(),
        })
        var id = $(this).attr('data-id');

        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${id}`,
            success: function(res) {
                form.val('form_edit', res.data);
            }
        })
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    $('#tbody').on('click', '.btn_del', function() {
        var id = $(this).attr('data-id');
        indexDel = layer.confirm('确定要删除这一项吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/deletecate/${id}`,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg(res.message);
                    layer.close(indexDel);
                    initArtCateList();
                }
            })
        });
    })
})