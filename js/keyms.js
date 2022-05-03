$("#btn-get-cid").attr("disabled", !0);
$(window).on("load",
function() {
    $("#iid").on("change paste input",
    function(e) {
    	var t = this.value.replace(/[^\w]/g,'');
        25 == t.length? ( $("#iid-indicator").text(t.length / 5 + "位数").removeClass("layui-bg-orange layui-bg-black").addClass("layui-bg-blue"), $("#btn-get-cid").attr("disabled", !1), $(this).removeClass("invalid noiid")) : (this.value = t, $("#btn-get-cid").attr("disabled", !0), $("#iid-indicator").text(t.length > 0 ? "错误Key": "未输入").removeClass("layui-bg-blue layui-bg-orange layui-bg-black").addClass(t.length > 0 ? "layui-bg-orange": "layui-bg-black"), $(this).removeClass("invalid noiid").addClass(t.length > 0 ? "invalid": "noiid"))
    });
});
function getcid() {
	IID = $("#iid").val();
	function doAjax() {
      $.ajax({
			url: "https://khoatoantin.com/ajax/pidms_api?keys=" + IID+"&justgetdescription=0&username=trogiup24h&password=PHO",
			type: "get",
			dataType: "json",
			cache: false,
			timeout: 60000,
			beforeSend: function (xhr) {
				$("#btn-get-cid").attr("disabled", !0);
				$("#btn-get-cid").html('检测中');
				$("#pid-name").val('');
			    $("#pid-prd").val('');
			    $("#pid-code").val('');
			    $("#pid-time").val('');
			},
			success: function (data) {
			    console.log(data);
			    console.log(data[0].is_retail);
			    if (data[0].is_retail == 1) {
			   $("#pid-name").val(data[0].keyname_with_dash);
			   $("#pid-prd").val(data[0].prd);
			   $("#pid-code").val(data[0].errorcode);
			   $("#pid-time").val(data[0].datetime_checked_done);
			   $("#err").html('代码');
               }else if (data[0].is_retail == 2) {
                $("#pid-name").val(data[0].keyname_with_dash);
			   $("#pid-prd").val(data[0].prd);
			     if(data[0].remaining >= 0){
			           $("#pid-code").val(data[0].remaining);
			          }else{
			          $("#pid-code").val('密钥已被封');
			       }
			   $("#pid-time").val(data[0].datetime_checked_done);
			   $("#err").html('次数');
               }else{
                 $("#pid-name").val('检测失败，请稍后重试');  
               }
				$("#btn-get-cid").html('检测密钥');
				$("#btn-get-cid").attr("disabled", !1);
			},
			error: function () {
			   $("#cid-cont").val('请求超时，请稍后重试');
			   $("#btn-get-cid").html('检测密钥');
			   $("#btn-get-cid").attr("disabled", !1); 
			}
		});
	}
	doAjax();


}
