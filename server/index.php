<?php

class Server {

	public function __construct() {

		$response = [];
		$action = $_POST["action"];

		switch ( $action ) {
				
			case "loadlevel":
				$response = $this->do_load_level( $_POST );
				break;
			case "saveLevel":
				$response = $this->do_save_level( $_POST );
				break;
			case "getLevels":
				$response["levelList"] = $this->get_all_levels( $_POST );
				break;
			default:
				$response["returnCode"] = "NOT_OK";
				break;
		}

		echo json_encode( $response );
	}

	private  function  do_save_level( $params ) {
		$metaData = [];
		$metaData["levelName"] = $params["levelName"];
		$response = $params;
		file_put_contents ( "levels/".$metaData["levelName"] . ".json" , $response["JSONData"] );

		// Do something interesting here.
		return $response;
	}
	
	private function do_load_level( $getLevel )
	{	
		$response = [];
		$response = file_get_contents ( $getLevel['levelName'] );
		
		return $response;
	}
	
	private function get_all_levels()
	{
		$listFiles = [];
		
		foreach(glob("levels/*.json") as $file) {
			array_push($listFiles, $file);
		}
		return ($listFiles);
	}
}

$server = new Server;

?>