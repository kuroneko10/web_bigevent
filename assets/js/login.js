$(function() {
    $('#link_regist').on('click', function() {
        $('.login-box').hide().siblings('.regist-box').show();
    });
    $('#link_login').on('click', function() {
        $('.regist-box').hide().siblings('.login-box').show();
    });

    var form = layui.form;
    var layer = layui.layer;
    var data = {
        username: $('#reg-form [name=username]').val(),
        password: $('#reg-form [name=password]').val()
    };
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if ($('#reg-pwd').val() !== value) return '两次密码输入不一致，请重新输入';
        }
    });

    $('#reg-form').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message, { timer: 1500 });
            $('#reg-form [name=password]').val('');
            $('#reg-form [name=username]').val('');
            $('#reg-form [name=repassword]').val('');
            layer.msg(res.message, { timer: 1500 });
            $('#link_login').click();
        })
    });

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message, { time: 1500 });
                layer.msg(res.message, { time: 1500 });
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/第四阶段/第四阶段笔记/3.大事件后台管理/index.html'
            }
        })
    })
})