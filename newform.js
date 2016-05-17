
var app1 = angular.module('app2', []);
	app1.controller("formsController",function($scope,$http){
	    
      $scope.newStudentValue = 0;
      $scope.newStudent = function(value){
        $scope.newStudentValue = value;
      };

      $scope.allStudentsValue = 0;
      $scope.allStudents = function(value){
      $scope.allStudentsValue = value;  
      }

      $scope.clear = function(){
	     	  $scope.student.name="";
	      	$scope.student.email="";
	      	$scope.student.age="";
	      	$scope.student.dob="";
          $(".clr").hide();
	    }  


	 	$scope.create = function(student){
    	 	$http.post("http://192.168.199.239:3000/students",student)
       		.then(function(response){
       		// alert(student.name);
       		//student below is from rails create controller
       		//we can use these student_details in create page to show after submitting
       		$scope.student_details = response.data.student;
       		console.log($scope.student_details)
       		$scope.clear();
        
     		});
   		}

    $scope.student_data = function(){
       $http.get("http://192.168.199.239:3000/students")
       .then(function(response){
         $scope.students = response.data.students;
     
     });
  }

  $scope.show = function(id){
   // window.location = "show.html";
  $http.get("http://192.168.199.239:3000/students/"+id)
       .then(function(response){
          $scope.student_show = response.data.student;
          console.log( $scope.student_show)
          // alert($scope.student_show.name)
     });

}

$scope.destroy = function(id){
   // window.location = "show.html";
 var r = confirm("Do you want to delete ?");
if (r == true) {
  $http.delete("http://192.168.199.239:3000/students/"+id)
       .then(function(response){
           // $scope.student_delete = response.data.student;
           alert("your data is deleted")
        });
            } 
else {
    alert("your data is safe")
    } 
  
        

}

 $scope.edit_student=function(id){
    $http.get("http://192.168.199.239:3000/students/"+id)
    .then(function(response){
      $scope.student_edit=response.data.student;
      $scope.student=$scope.student_edit
        $scope.newStudentValue = 1;
    });
  }

  $scope.update=function(student){
    // alert(student);
          $http.put("http://192.168.199.239:3000/students/"+student,$scope.student)
    .then(function(response){

      $http.get("http://192.168.199.239:3000/students.json")
        .then(function(response){
          $scope.students=response.data.students;
        });
        $scope.clear();
    });
}

   $scope.student_data();      

   		
});