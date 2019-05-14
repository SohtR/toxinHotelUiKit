var $start = $('#start'),
    $end = $('#end');

$start.datepicker({
    onSelect: function (fd, date) {
        $end.data('datepicker')
                .update('minDate', date);

        $end.focus();
    }
})

$end.datepicker({
    onSelect: function (fd, date) {
        $start.data('datepicker')
                .update('maxDate', date)
    }
})
