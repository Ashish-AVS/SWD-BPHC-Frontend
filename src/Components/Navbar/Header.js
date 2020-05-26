import React from 'react';


const Header=()=>{
return(
    <div className="container-fluid" style={{marginTop:"-25px"}}>
	<div className="row">
	<div className="col-md-4 col-sm-4 col-xs-4" style={{borderTop:"15px solid #ffe275"}}></div>
	<div className="col-md-4 col-sm-4 col-xs-4" style={{borderTop:"15px solid #cf2027 "}}></div>
	<div className="col-md-4 col-sm-4 col-xs-4" style={{borderTop:"15px solid #5ccae8 "}}></div>
</div>
<div className="row mt-2" style={{display:'flex',justifyContent:'center',color:"#2c3e50"}}>
		<h2 style={{fontSize:"35px"}}>STUDENT WELFARE DIVISION</h2>
</div>
</div>
    );
}

export default Header;