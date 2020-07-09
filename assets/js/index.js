$(function() {
    getUserInfo();

    var layer = layui.layer;
    $('#btn_logout').on('click', function() {
        layer.confirm('确定要退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/第四阶段/第四阶段笔记/3.大事件后台管理/login.html'
            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message);
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/第四阶段/第四阶段笔记/3.大事件后台管理/login.html'
        //     };
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html(`欢迎&nbsp;${name}`);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var firstWord = name[0].toUpperCase();
        $('.text-avatar').html(firstWord).show();
    }
}