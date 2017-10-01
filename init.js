function init() {
	var fileInput = document.querySelector("#file-chooser"),
		list = document.querySelector("#function-list")
  	fileInput.onchange = function (e) {
		var reader = new FileReader();
		reader.onload = function() {
			let arrayBuffer = this.result,
				buffer = new Uint8Array(arrayBuffer),
				module = new WebAssembly.Module(buffer),
				instance = new WebAssembly.Instance(module);
			list.querySelectorAll("li").forEach(function (i) {
				i.remove()
			})
			for (var i in instance.exports) {
				if (isNative(instance.exports[i])) {
					var li = document.createElement("li")
					li.innerText = i
					list.appendChild(li)
				}
			}
		}
		reader.readAsArrayBuffer(this.files[0]);
	}
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
  	init()
  }
}

function isNative(fn) {
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
}