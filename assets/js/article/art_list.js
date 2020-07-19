$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hou = padZero(dt.getHours());
        var min = padZero(dt.getMinutes());
        var sec = padZero(dt.getSeconds());

        return `${y}-${m}-${d}  ${hou}:${min}:${sec}`;
    }

    initTable();
    initCate();

    function padZero(n) {
        n = n < 10 ? '0' + n : n;
        return n;
    }

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function(obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) initTable();
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: ['2', '3', '5', '10']
        })
    }

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault();

        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;

        initTable();
    })

    $('tbody').on('click', '.btn_del', function() {
        var len = $('.btn_del').length;
        var id = $(this).attr('data-id');
        layer.confirm('确定要删除这一项吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/delete/${id}`,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg(res.message);
                    if (len <= 1) q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    initTable();
                }
            })
            layer.close(index);
        })
    })
})