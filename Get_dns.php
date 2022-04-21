<?php
if(isset($_POST['domain']) && isset($_POST['type'])){
	$result = getdns($_POST['domain'],$_POST['type']);
	if($result){
		$response=array(
						"status" => "success",
						"msg"=>"",
						"data"=>$result
				);
	}
	else{
		$response=array(
						"status" => "failed",
						"msg"=>"Some Error Occured, Try Again!!",
						"data"=>""
				);
	}
	echo json_encode($response);
}
function getdns($domain,$typ){
		$arr=[];
		
			if($typ=="A"){$type =1;}
			if($typ== "CNAME"){$type =16;}
			if($typ== "HINFO"){$type =4096;}
			if($typ== "MX"){$type =16384;}
			if($typ== "CAA"){$type =DNS_CAA;}
			if($typ== "NS"){$type =2;}
			if($typ== "PTR"){$type =2048;}
			if($typ== "SOA"){$type =32;}
			if($typ== "TXT"){$type =32768;}
			if($typ== "AAAA"){$type =134217728;}
			if($typ== "SRV"){$type =33554432;}
			if($typ== "NAPTR"){$type =67108864;}
			if($typ== "A6"){$type =16777216;}
			if($typ == "All"){$type = DNS_ALL;}
		$res=dns_get_record($domain, (int)$type);
		
		if(!empty($res)){
    		foreach($res as $ar){
    			if($ar["type"] == "MX" || $ar["type"] == "NS"){
    				$ar["ip"] =gethostbynamel($ar["target"]) ? gethostbynamel($ar["target"]) : "" ;
    			}
    			$ar["msgg"]="";
        		array_push($arr,$ar);
    		}
		}
		else{
			
			if($typ =="ALL"){$hidden="yes";}else{$hidden="no";}
			$em=array("type"=>$typ,"msgg"=>"Sorry No Records Found","ttl"=>"","class"=>"","hidden"=>$hidden);
			array_push($arr,$em);
		}
		return $arr;
	}
?>