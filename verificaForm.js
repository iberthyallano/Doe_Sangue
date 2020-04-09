class verificaForm{

	constructor(n, e, b) {
		this.name = n;
		this.email = e;
		this.blood = b;
	}

	form(){
		if(this.name == "" || this.email == "" || this.blood == ""){
			return 1;
		}
	
		let usuario = this.email.value.substring(0, this.email.value.indexOf("@"));
		let dominio = this.email.value.substring(this.email.value.indexOf("@")+ 1, this.email.value.length);
		
		if ((usuario.length >=1) &&
		    (dominio.length >=3) && 
		    (usuario.search("@")==-1) && 
		    (dominio.search("@")==-1) &&
		    (usuario.search(" ")==-1) && 
		    (dominio.search(" ")==-1) &&
		    (dominio.search(".")!=-1) &&      
		    (dominio.indexOf(".") >=1)&& 
		    (dominio.lastIndexOf(".") < dominio.length - 1)) {
		}
		else{
		    return 2;
		}
		   
		if(this.blood != "A+" && 
		   this.blood != "A-" && 
		   this.blood != "B+" && 
		   this.blood != "B-" && 
		   this.blood != "O+" && 
		   this.blood != "O-" && 
		   this.blood != "AB+" && 
		   this.blood != "AB-"){
				return 3;
		}

		return 0;
	}

}
module.exports = verificaForm;
