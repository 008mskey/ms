$("#btn-get-cid").attr("disabled", !0);
$(window).on("load",
function() {
    $("#iid").on("change paste input",
    function(e) {
    	var t = this.value.replace(/\D/g, "");
        54 == t.length || 63 == t.length ? (this.value = t.match(new RegExp(".{1," + t.length / 9 + "}", "g")).join("-"), $("#iid-indicator").text(t.length / 9 + "位数").removeClass("layui-bg-orange layui-bg-black").addClass("layui-bg-blue"), $("#btn-get-cid").attr("disabled", !1), $(this).removeClass("invalid noiid")) : (this.value = t, $("#btn-get-cid").attr("disabled", !0), $("#iid-indicator").text(t.length > 0 ? "错误IID": "没有IID").removeClass("layui-bg-blue layui-bg-orange layui-bg-black").addClass(t.length > 0 ? "layui-bg-orange": "layui-bg-black"), $(this).removeClass("invalid noiid").addClass(t.length > 0 ? "invalid": "noiid"))
    });
});
function getcid() {
	IID = $("#iid").val();
	function doAjax() {
      $.ajax({
			url: "https://khoatoantin.com/ajax/cidms_api?iids=" + IID+"&username=trogiup24h&password=PHO",
			type: "get",
			dataType: "json",
			cache: false,
			timeout: 60000,
			beforeSend: function (xhr) {
				$("#btn-get-cid").attr("disabled", !0);
				$("#btn-get-cid").html('获取中');
				$("#cid-cont").val('');
				$("#cid-split").val('');
				var block=["a","b","c","d","e","f","g","h"];
				for(var x in block){
					$("#block-" + block[x]).val('');
				}
			},
			success: function (data) {
			    console.log(data);
			    if (data.typeiid == 1) {
			   $("#cid-cont").val(data.confirmation_id_no_dash);
			   $("#cid-split").val(data.confirmation_id_with_dash);
               }else if (data.typeiid == 4) {
                   if (data.short_result == "IID is not correct!!") {
	                   	 $("#cid-cont").val('安装ID错误，请检查后重新输入');
                    	} else {
	                       $("#cid-cont").val('密钥失效，请更换密钥激活');
                     	}
               }else if (data.typeiid == 3) {
                   $("#cid-cont").val('无法获取确认ID，建议不要使用020密钥');
               }
               else{
                 $("#cid-cont").val('检测失败，请稍后重试');  
               }
				$("#btn-get-cid").html('获取确认ID');
				$("#btn-get-cid").attr("disabled", !1);
			},
			error: function () {
			   $("#cid-cont").val('请求超时，请稍后重试');
			   $("#btn-get-cid").html('获取确认ID');
			   $("#btn-get-cid").attr("disabled", !1); 
			}
		});
	}
	doAjax();


}
