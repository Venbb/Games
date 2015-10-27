<!--#include file="md5.asp"-->
<!--#include file="nosql.asp"-->
<%

Buttonid=nosql(request("Button"))
'buttonid="nosql()"
country=nosql(request("country"))
myid=nosql(request("myid"))
backurl="http://www.enveesoft.com"
productname=nosql(request("productname"))
servicename=nosql(request("servicename"))
backurl="http://www.enveesoft.com/barbarian/mopay/mopayreceive.asp"

token=md5("FUauJIECZa"&Buttonid&myid&backurl&productname&servicename)

%>

<form action="https://securepay.mopay.com/mopay20/button/start.action" method="post" name="buttonForm" id="buttonForm" target="buttonWindow" >
    
        <!-- BY BUTTON ID  -->
        <input type="hidden" name="buttonid" value="<%=buttonid%>"/>
        <input type="hidden" name="country" value="DE"/>
        <!-- BY BUTTON ID END-->
    <!-- IFRAME-->
    <input type="hidden" name="backurltarget" value="_top" />
    <!-- IFRAME-->

<!-- Merchant: Add e.g. your shoping cart identifier for the buyer (max. 255 chars) -->
<input type="hidden" name="myid" value="<%=myid%>" />

<!-- Merchant: Set the back url to your shop (max. 2000 chars) -->
<input type="hidden" name="backurl" value="<%=backurl%>" />

<!-- Merchant: Add purchased product(s) name (max. 20 chars) -->
<input type="hidden" name="productname" value="<%=productname%>"/>

    <!-- Merchant: Add your service name here, the parameter is optional (max. 40 chars) -->
    <input type="hidden" name="servicename" value="<%=servicename%>"/>
<!-- Merchant: Build a MD5 check sum -->
<input type="hidden" name="token" value="<%=token%>" />

</form>

    <!-- IFRAME-->
    <!-- the next link is a sample (!) how to use the mopay image and post the above form -->
    <a href="#" id="buttonLink" onclick="document.getElementById('buttonForm').submit();return false;" style="border:0;padding:10px;margin:20px;background-color:white;vertical-align:middle;">
    <img src="https://securepay.mopay.com/mopay20/buttons/btn_checkout.gif" alt="Mopay"></a>
    <iframe src="" width="950" height="800" hspace="0" vspace="0" frameborder="0" scrolling="no" allowtransparency="true" name="buttonWindow" id="buttonWindow" style="border:0;background-color:transparent;" ></iframe>
    <!-- IFRAME-->