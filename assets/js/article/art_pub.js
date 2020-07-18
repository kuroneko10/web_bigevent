$(function() {
    var layer = layui.layer;
    var form = layui.form;

    // 1. 初始化图片裁剪器
    var $image = $('#image');
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    // 3. 初始化裁剪区域
    $image.cropper(options);

    initCate();
    initEditor();

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

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    })

    $('#coverFile').on('change', function(e) {
        var fileList = e.target.files;
        if (fileList.length <= 0) return layer.msg('请选择图片！');
        var file = fileList[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })

    var art_state = '已发布';

    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })
})