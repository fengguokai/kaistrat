  $(function(){
    	  function words_deal() { 
          var curLength=$("#formCon").val().length; 
         $("#textCount").text(10-$("#formCon").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon").keyup(words_deal)
    });

         function words_deal1() { 
          var curLength=$("#formCon1").val().length; 
         $("#textCount1").text(40-$("#formCon1").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon1").keyup(words_deal1)
    });
        function words_deal2() { 
          var curLength=$("#formCon2").val().length; 
         $("#textCount2").text(30-$("#formCon2").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon2").keyup(words_deal2)
    });
        function words_deal3() { 
          var curLength=$("#formCon3").val().length; 
         $("#textCount3").text(100-$("#formCon3").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon3").keyup(words_deal3)
    });
        function words_deal4() { 
          var curLength=$("#formCon4").val().length; 
         $("#textCount4").text(40-$("#formCon4").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon4").keyup(words_deal4)
    });
        function words_deal5() { 
          var curLength=$("#input1").val().length; 
         $("#textCount5").text(10-$("#input1").val().length); 
    } 
         $(document).ready(function(){
         $("#input1").keyup(words_deal5)
    });
        function words_deal6() { 
          var curLength=$("#formCon6").val().length; 
         $("#textCount6").text(100-$("#formCon6").val().length); 
    } 
         $(document).ready(function(){
         $("#formCon6").keyup(words_deal6)
    });

    })