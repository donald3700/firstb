$(document).ready(function() {   
        $("#createAccount").click(function(event){
            event.preventDefault();
            var formData = $("#formSignUp").serialize();
            console.log(formData); //To test run data is being posted
            $.ajax({
                beforeSend:function(){
                            $("#loading").show();
                            $("#creating").show();
                },
                url: 'formValidation.php',
                method: 'post',
                data: formData + '&action=createAccount',
                dataType: 'JSON',
                success:function(result){
                          if(result.errNum == 1){
                                setTimeout(() => { 
                                    $("#errorLoader").show();
                                    $("#result").text(result.err);
                                }, 5000);   
                          }else if(result.errNum == 2){
                              setTimeout(() => { 
                                    window.location = 'http://firstactionfinance.com/admin/confirm.php?uniqueID=' + encodeURIComponent(result.accountNumber);
                                }, 7000);
                          }
                },
                error:function(xhr, status, error){
                    alert('error popped');
                },
                complete:function(){
                        setTimeout(() => { $("#loading").hide(); }, 5000);
                        setTimeout(() => { $("#errorLoader").hide(); }, 8000);
                }
            });
        }); //end of createAccountValidation
        
        
        //fakeTransferValidation
        $("#addTransaction").click(function(e){
            e.preventDefault();
            var formData = $("#formFakeTransfer").serialize();
            console.log(formData);
            $.ajax({
                beforeSend:function(){
                    $("#transfer").show();
                    $("#printOut").html('Transfering...');
                },
                url: 'FkTx.php',
                method: 'post',
                data: formData + '&action=addTransaction',
                dataType: 'JSON',
                success:function(output){
                    console.log(output);
                        $("#failing").show();
                        $("#errorPut").html(output);
                        /*data = JSON.parse(output);
                        $("#failing").show();
                        $("#errorPut").html(data.uniqueID);*/
                },
                error:function(output){
                    alert('Fatal Error, Trace it');
                },
                complete:function(){
                    setTimeout(() => { 
                            $("#transfer").hide();
                            $("#printOut").hide();
                        }, 5000);
                }
            });
        }); //end of fake transfer validation
        
        
}); //End of Document Ready