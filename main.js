const zenList = {
  zen: "",
  addZen: function(zenText) {
    this.zen = zenText;
  }
};

const view = {
  displayZen: function() {
    let zenDiv = document.getElementById("zenDisplay");
    zenDiv.innerHTML = zenList.zen;
  }
};

const handlers = {
  getZen: function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
      if (XHR.readyState == 4) {
        console.log(XHR.status);
        if (XHR.status == 200) {
          zenList.addZen(XHR.responseText);
          view.displayZen();
        } else if (XHR.status == 403) {
          zenList.addZen("API Request Limit Reached Try Again Later :-(")
          view.displayZen();
        } else {
            console.log("There was a problem!");
        }
      }
    };

    XHR.open("GET", "https://api.github.com/zen");
    XHR.send();
  }
};
