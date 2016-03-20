function FcaElement(){
	this.element = element;

	this.getElement = function(){
		return this.element;
	}

	this.getId = function () {
		return this.element.toString();
	}

	this.equals = function(obj){
		if(obj == null){
			return false;
		} else if (obj == this){
			return true;
		} else if (!(obj instanceof FcaElement)) {
			return false;
		} else {
			var otherObj = new FcaElement();
			obj = new FcaElement();
			otherObj = obj;
			return otherObj.toString().equals(getId());
		}
	}
}