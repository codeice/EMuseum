
function loadingExhibit(y, m, d) {
    alert('Loading ' + y + ':' + m + ':' + d + ' Data');
}
$(document).ready(function () {
    TimeControl.Init(loadingExhibit);
});


var TimeControl = {
    Init: function (params) {
        TimeControl.LoadingExhibit = params;
        TimeControl.GetInitUrl();
        //�����ѡ��
        $('.date-item').live("click", function () {
            var val = $(this).text().replace(/^\s+|\s+$/g, '');
            var month = $('#hidMonth').val();
            TimeControl.HiddenYearChangeDiv();
            $('#hidYear').val(val);
            TimeControl.AppendDateHtml(val, month);
        });
        //ǰһ�����ѡ��ť
        $('#date-sub').live("click", function () {
            $.each($('td.date-item'), function (index, el) {
                $(el).text(eval($(el).text()) - 1);
            })
        });
        //��һ�����ѡ��ť
        $('#date-plus').click(function () {
            $.each($('td.date-item'), function (index, el) {
                $(el).text(eval($(el).text()) + 1);
            })
        });
        //���·�ѡ��
        $('.date-month-item').live("click", function () {
            var year = $('#hidYear').val();
            var val = $(this).children('input').val();
            TimeControl.HiddenMonthChangeDiv();
            $('#hidMonth').val(val);
            TimeControl.AppendDateHtml(year, val);
        });
        //���ѡ����ʾ
        $('#hidYear-button').hover(function () {
            $('#monthChangeDiv').css('display', 'none');
            $('#yearChangeDiv').css('display', 'block');
        });
        //�·�ѡ����ʾ
        $('#hidMonth-button').hover(function () {
            $('#yearChangeDiv').css('display', 'none');
            $('#monthChangeDiv').css('display', 'block');
        });
        //������ѡ��
        $('#timeDay-Number span').live("click", function () {
            TimeControl.HiddenYearChangeDiv();
            TimeControl.HiddenMonthChangeDiv();
            TimeControl.AddSelectClass($(this));
            TimeControl.GetExhibitionDetail($(this));
            TimeControl.selected = "#" + $(this).attr("id");
        });
        //������ǰ�л�
        $('#turn-date-right').click(function () {
            var itemLength = 320;
            if (TimeControl.position > -1216) {
                TimeControl.position = TimeControl.position - itemLength;
                $('#timeDay-Number').animate({ left: TimeControl.position + 'px' }, 800);
            }
            if (TimeControl.position < -1216 && TimeControl.position > -1344) {
                TimeControl.position = -1344;
                $('#timeDay-Number').animate({ left: TimeControl.position + 'px' }, 800);
                return;
            }
            else if (TimeControl.position <= -1344) {
                var month = $('#hidMonth').val();
                var year = $('#hidYear').val();

                if (month == '12') {
                    $('#hidYear').val(parseInt(year) + 1);
                    $('#hidMonth').val('1');
                    TimeControl.AppendDateHtml(parseInt(year) + 1, 1);
                }
                else {
                    TimeControl.AppendDateHtml(year, month + 1);
                    $('#hidMonth').val(parseInt(month) + 1);
                }

                $('#timeDay-Number').animate({ left: position + 'px' });
            }
        });
        //��������л�
        $('#turn-date-left').click(function () {
            var itemLength = 320;
            if (TimeControl.position < 0 && TimeControl.position >= -itemLength) {
                TimeControl.position = 0;
                $('#timeDay-Number').animate({ left: TimeControl.position + 'px' }, 800);
                return;
            }
            if (TimeControl.position < -itemLength) {
                TimeControl.position = TimeControl.position + itemLength;
                $('#timeDay-Number').animate({ left: TimeControl.position + 'px' }, 800);
            }
            else if (TimeControl.position == 0) {
                var month = $('#hidMonth').val();
                var year = $('#hidYear').val();
                if (month == 1) {
                    $('#hidYear').val(year - 1);
                    $('#hidMonth').val('12');
                    TimeControl.AppendDateHtml(year - 1, 12);
                }
                else {
                    TimeControl.AppendDateHtml(year, month - 1);
                    $('#hidMonth').val(month - 1);
                }
                TimeControl.position = -1344;
                $('#timeDay-Number').animate({ left: TimeControl.position + 'px' });
            }
        });
    },
    //��ǰλ��
    postion: 0,
    //��ǰѡ������
    selected: '',
    //���ݼ����¼�����ע��
    LoadingExhibit: new Object(),
    //��ȡ��ʼ�����ݼ���
    GetInitUrl: function () {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();

        $('#hidYear').val(year);
        $('#hidMonth').val(month);
        TimeControl.AppendDateHtml(year, month);
        $('#span-' + day).addClass('select');
        selected = '#span-' + day;
        var j = $('#span-' + day).offset().left;
        var i = $('#span-1').offset().left;
        this.position = i - j;
        $('#timeDay-Number').animate({ left: TimeControl.position + 'px' });
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        TimeControl.LoadingExhibit(year, month, day);
    },
    //Ϊѡ������������ʽ
    AddSelectClass: function (id) {
        $('#timeDay-Number span').removeClass('select');
        id.addClass('select');
    },
    //����ʱ���Ӧ����
    GetExhibitionDetail: function (id) {
        var day = id.text();
        day = day.split('��')[0];
        var year = $('#hidYear').val();
        var month = $('#hidMonth').val();
        if (month.toString().length < 2) {
            month = "0" + month;
        }
        if (day.toString().length < 2) {
            day = "0" + day;
        }
        TimeControl.LoadingExhibit(year, month, day);
    },
    //�������ѡ���
    HiddenYearChangeDiv: function () {
        $('#yearChangeDiv').css('display', 'none');
    },
    //�����·�ѡ���
    HiddenMonthChangeDiv: function () {
        $('#monthChangeDiv').css('display', 'none');
    },
    //��������
    AppendDateHtml: function (year, val) {
        var num = TimeControl.DayNumOfMonth(year, val);
        $('#timeDay-Number').html('');
        for (var i = 1; i <= num; i++) {
            $('#timeDay-Number').append('<span id=span-' + i + ' class=dayNumber>' + i + '��</span>');
        }
        position = 0;
        $('#timeDay-Number').css('left', '0');
    },
    //�жϵ�ǰ�·���������
    DayNumOfMonth: function (year, month) {
        var d = new Date(year, month, 0);
        return (d.getDate());
    }
};
