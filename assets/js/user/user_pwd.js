$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('#oldPwd').val()) return '新密码与旧密码不能相同！';
        },
        rePwd: function(value) {
            if (value !== $('#newPwd').val()) return '新密码与确认密码不一致！';
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })
})