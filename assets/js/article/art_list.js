$(function() {
    var q = {
        pagenum: 2,
        pagesize: 3,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer;
    var form = layui.form;

    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hou = padZero(dt.getHours());
        var min = padZero(dt.getMinutes());
        var sec = padZero(dt.getSeconds());

        return `${y}-${m}-${d}&nbsp;&nbsp;${hou}:${min}:${sec}`;
    }

    initTable();
    initCate();

    function padZero(n) {
        n = n < 10 ? '0' + n : n;
        return n;
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
})