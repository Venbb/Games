<%
'ģ������
'2003.10.31
'�������ⲿ�ύ���ݵ�ѡ��

'���ڸ�ʽ��
Function FormatDate(DT,tp)
	dim Y,M,D
	Y=Year(DT)
	M=month(DT)
	D=Day(DT)
	YY=right(Y,2)
	if M<10 then M="0"&M
	if D<10 then D="0"&D
	select case tp
	case 1 FormatDate=Y&"��"&M&"��"&D&"��"
	case 2 FormatDate=Y&"-"&M&"-"&D
	case 3 FormatDate=M&"-"&D
	
	end select
End Function
'Email���
function IsValidEmail(email)
dim names, name, i, c
IsValidEmail = true
names = Split(email, "@")
if UBound(names) <> 1 then
   IsValidEmail = false
   exit function
end if
for each name in names
   if Len(name) <= 0 then
     IsValidEmail = false
     exit function
   end if
   for i = 1 to Len(name)
     c = Lcase(Mid(name, i, 1))
     if InStr("abcdefghijklmnopqrstuvwxyz_-.", c) <= 0 and not IsNumeric(c) then
       IsValidEmail = false
       exit function
     end if
   next
   if Left(name, 1) = "." or Right(name, 1) = "." then
      IsValidEmail = false
      exit function
   end if
next
if InStr(names(1), ".") <= 0 then
   IsValidEmail = false
   exit function
end if
i = Len(names(1)) - InStrRev(names(1), ".")
if i <> 2 and i <> 3 then
   IsValidEmail = false
   exit function
end if
if InStr(email, "..") > 0 then
   IsValidEmail = false
end if
end function


'ģ������������2005.11.4��QQ��9912515
function nosql(str)
if not isnull(str) then
str=trim(str)
str=replace(str,";","&#59;")		'�ֺ�
str=replace(str,"'","&#39;")		'������
str=replace(str,"""","&quot;")		'˫����
str=replace(str,"chr(9)","&nbsp;")	'�ո�
str=replace(str,"chr(10)","<br>")	'�س�
str=replace(str,"chr(13)","<br>")	'�س�
str=replace(str,"chr(32)","&nbsp;")	'�ո�
str=replace(str,"chr(34)","&quot;")	'˫����
str=replace(str,"chr(39)","&#39;")	'������
str=Replace(str, "script", "&#115cript")'jscript
str=replace(str,"<","&lt;")	        '��<
str=replace(str,">","&gt;")	        '��>
str=replace(str,"(","&#40;")	        '��(
str=replace(str,")","&#41;")	        '��)
str=replace(str,"--","&#45;&#45;")	'SQLע�ͷ�
nosql=str
end if
end function


function shuzhi(str)
if str="" or isnull(str)=true then 
str=0
else
str=str
end if
shuzhi=str

end function





Function nozh(str)
if not isnull(str) then
nozh1=split("�ú���,�ͷ�,�ͷ�����,�ο�,�ÿ�,GM,GAMEMASTER,����,�ͻ�����,����,����,ϵͳ,����,����,����,������ְ�,����,�侫,��,ȥ��,��ʺ,���,���,����,��,����,������,����,ɵ��,ɵB,����,����,���,����,����,����,����,����,����,����,����,����,����,غ��,��ȥ ,���������,���������,���������,��Ƥ,��ͷ,��,�P,��,�H,����,��,��,������,���ֹ�,����,���g��,����,�ع�ǿ,���㹦,���־,ë��,����",",")
nozh2=ubound(nozh1)
for i=0 to nozh2 
str=replace(str,nozh1(i),"*")
next
nozh=str
end if	
end Function

Function ChkPost()
	chkpost=true
end Function

Function ChkPosturl()
    dim HTTP_REFERER,SERVER_NAME
	dim server_v1,server_v2
	chkposturl=false
    SERVER_NAME=nosql(Request.ServerVariables("SERVER_NAME"))
	HTTP_REFERER=nosql(Request.ServerVariables("HTTP_REFERER"))
    server_v1=Cstr(HTTP_REFERER)
	server_v2=Cstr(SERVER_NAME)
	if mid(server_v1,8,len(server_v2))<>server_v2 then
		chkposturl=false
	else
		chkposturl=true
	end if
End Function

Rem �ж������Ƿ�����
function isChkInteger(para)
       on error resume next
       dim str
       dim l,i
       if isNUll(para) then 
          isChkInteger=false
          exit function
       end if
       str=cstr(para)
       if trim(str)="" then
          isChkInteger=false
          exit function
       end if
       l=len(str)
       for i=1 to l
           if mid(str,i,1)>"9" or mid(str,i,1)<"0" then
              isChkInteger=false 
              exit function
           end if
       next
       isChkInteger=true
       if err.number<>0 then err.clear
end function

function cutStr(str,strlen)
	dim l,t,c
	l=len(str)
	t=0
	for i=1 to l
	c=Abs(Asc(Mid(str,i,1)))
	if c>255 then
	t=t+2
	else
	t=t+1
	end if
	if t>=strlen then
	cutStr=left(str,i)&".."
	exit for
	else
	cutStr=str
	end if
	next
	cutStr=replace(cutStr,chr(10),"")
end function
function htmltotext(byval nr)
''����html�ַ���
pa=""
strContent=nr

Set regex = New RegExp 
regEx.Global = True

regEx.IgnoreCase = False ' �����Ƿ����ִ�Сд��<BR>

'ȥ������
regEx.Pattern = "\n"
strContent = regEx.Replace(strContent,"")

regEx.Pattern = "<[a-zA-Z]+([ ]|[^\n>]|[%$#@!'])*>"
strContent = regEx.Replace(strContent,"")
regEx.Pattern = "</[a-zA-Z]+>"
strContent = regEx.Replace(strContent,"")
regEx.Pattern = "[ ]+"
strContent = regEx.Replace(strContent," ")

strContent=replace(strContent,"&nbsp;","")

if len(strContent)>1000 then
strContent=left(strContent,1000) & "......"
end if

htmltotext=strContent

end function

function forn(n)
'if n>0 and n<1 then
'forn=0&cstr(n)
'else 
'if n<0 and n>-1 then
'forn=replace(cstr(n),"-","-0")
'else
if n<>"" then
forn=Formatnumber(n,2,-1,0,0)
else
forn=n
end if
'end if
'end if
end function


function forn1(n)
if n>0 and n<1 then
forn1=0&cstr(n)
else 
if n<0 and n>-1 then
forn1=replace(cstr(n),"-","-0")
else
forn1=n
end if
if instr(n,".")=0 then forn1=n&".00"
end if
end function

%>