$(function() {
    $('#link_regist').on('click', function() {
        $('.login-box').hide().siblings('.regist-box').show();
    });
    $('#link_login').on('click', function() {
        $('.regist-box').hide().siblings('.login-box').show();
    })
})