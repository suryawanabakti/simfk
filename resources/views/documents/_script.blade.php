<form id="saveLog" method="POST">
    <input type="hidden" name="log" value="true">
</form>

<script type="text/javascript">
    function promptLetter() {
        var date = new Date();
        var year = date.getFullYear();
        var text = "Silahkan input nomor surat (NO. ................/UN4.6.3/KM.00.00/" + year + ")";
        var letter = prompt(text);

        if (letter == null || letter == "") {
            document.getElementById("no_surat").style.cssText = 'display:inline-block; width:70px';
        } else {
            document.getElementById("no_surat").innerHTML = letter
        }
    }

    window.onafterprint = function(event) {
        close();
    }

    promptLetter();
    window.print();
</script>
