var now = new Date();
var endDate = new Date(now.getTime() + 365*24*60*60*1000)
var $start2 = $('#start2'),
    $end2 = $('#end2');
var $datepickers = $('.datepickers2');

$datepickers.datepicker({
    language: 'ru',
    // offset: ,
    navTitles: {
      days: '<i>yyyy</i> MM',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    },
    minDate: now,
    maxDate: endDate,
    multipleDatesSeparator: "-",
    range: true,
      onSelect: function (fd, date) {
        $end2.data('datepicker')
                .update('selectedDates', $start.data('datepicker').selectedDates);
        var start = fd.split('-')[0]
        var end = fd.split('-')[1];
        if (end) {
          $start2.val(start);
          $end2.val(end);
        } else {
          $end.val('')
        }
        console.log($start2.data('datepicker'));
    }
})