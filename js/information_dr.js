$(document).ready(function () {
    // 模拟的日志数据
    var logs = [
        { title: "工作日志(1) ", link: "/log_dr/log1.html", time: "2023年5月31日", author: "郭方一" },
    ];

    // 分页配置
    var itemsPerPage = 10; // 每页显示的日志记录数
    var currentPage = 1; // 当前页码

    // 显示日志记录
    function showLogs() {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;

        var $informList = $('.informList');
        $informList.empty();

        for (var i = startIndex; i < endIndex; i++) {
            if (i >= logs.length) {
                break;
            }

            var log = logs[i];
            var logItem = '<li><a href="' + log.link + '"><span></span><h4>' + log.title + '</h4><p class="time">' + log.time + '</p><p>' + log.author + '</p></a></li>';
            $informList.append(logItem);
        }
    }

    // 更新分页器
    function updatePaginator() {
        var totalPages = Math.ceil(logs.length / itemsPerPage);

        var $page = $('.page');
        $page.empty();

        // 显示总条数、当前页数和总页数
        var info = '<span class="info">共' + logs.length + '条记录，当前第' + currentPage + '页，共' + totalPages + '页</span>';
        $page.append(info);

        // 首页按钮
        var firstPage = '<a class="btn" href="javascript:void(0);" onclick="gotoPage(1)">首页</a>';
        $page.append(firstPage);

        // 上一页按钮
        if (currentPage > 1) {
            var prevPage = '<a class="btn" href="javascript:void(0);" onclick="gotoPage(' + (currentPage - 1) + ')">上一页</a>';
            $page.append(prevPage);
        }

        // 下一页按钮
        if (currentPage < totalPages) {
            var nextPage = '<a class="btn" href="javascript:void(0);" onclick="gotoPage(' + (currentPage + 1) + ')">下一页</a>';
            $page.append(nextPage);
        }

        // 尾页按钮
        var lastPage = '<a class="btn" href="javascript:void(0);" onclick="gotoPage(' + totalPages + ')">尾页</a>';
        $page.append(lastPage);

        // 跳转到指定页码的输入框和GO按钮
        var goto = '跳转到第<input type="text" id="gotoPageInput" />页';
        goto += '<input type="button" value="GO" onclick="gotoPage(parseInt(document.getElementById(\'gotoPageInput\').value))" />';
        $page.append(goto);
    }

    // 跳转到指定页码
    window.gotoPage = function (page) {
        if (page < 1) {
            page = 1;
        } else if (page > Math.ceil(logs.length / itemsPerPage)) {
            page = Math.ceil(logs.length / itemsPerPage);
        }

        currentPage = page;
        showLogs();
        updatePaginator();
    };

    // 初始化显示第一页的日志记录和分页器
    showLogs();
    updatePaginator();
});
