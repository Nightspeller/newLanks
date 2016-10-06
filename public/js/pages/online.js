$(function() {
    var dialog = document.querySelector('#complain-dialog');
    var showDialogButton = document.getElementsByClassName('show-complain-dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    for (var i = 0; i < showDialogButton.length; i++) {
        showDialogButton[i].addEventListener('click', function() {
            dialog.showModal();
            document.activeElement.blur();
        });
    }

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    dialog.querySelector('.m_close').addEventListener('click', function() {
        dialog.close();
    });

    $("#complain-dialog-form").on('submit',{path: '/question?type=complain'}, send_form_data);
});