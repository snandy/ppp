/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/

/**
 * 取得一个节点中的xml片段，这个节点必须是一个有效的Element节点
 * @return 节点中的xml片段
 * @type String
 **/
UWA.innerXML = function(node) {
	var str = '';
	var nodes = node.childNodes;
	if (nodes) {
		for (var i=0; i<nodes.length; i++) {
			var nodeNow = nodes[i];
			if (nodeNow.nodeType == 3) {
				str += nodeNow.data;
			} else {
				if (nodeNow.xml) {
					str += nodeNow.xml;
				} else {
					var serializer = new XMLSerializer();
					str += serializer.serializeToString(nodeNow);
				}
			}
		}
	}
	return str;
}
	
UWA.log = function(obj) {
	if (window.console) {
		console.log(obj);
	} else {
		if ((App.Permit.able3rdDev || App.Permit.ableDemo) && document.readyState && document.readyState == "complete") {
			if (obj instanceof Error) {
				$LR("--------- Error ---------");
				$LR("name: " + obj.name);
				$LR("number:" + (obj.number & 0xFFFF));
				$LR("message: " + obj.message); 
				$LR("-------------------------");
			} else {
				$LR(obj.toString());
			}
			//	$LR(obj);
			/*
			if (obj instanceof Error) {
				throw obj;
			} else {
				throw new Error(obj.toString());
			}
			*/
		}
	}
}