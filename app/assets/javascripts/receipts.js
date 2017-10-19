function reload() {
  var selected = document.getElementById('receipt_dropdown').value;
  window.location = window.location.pathname + "?package=" + selected;
}
