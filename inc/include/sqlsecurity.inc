<%
function ReplaceTag2text(str)
	Dim text
	text = replace(str, "&", "&amp;")
	text = replace(text, "<", "")
	text = replace(text, ">", "")
	text = replace(text, "--", "�Ѥ�")
	text = replace(text, "|", "��")
	text = replace(text, "'", "''")
	text = replace(text, "chr(34)","&#34")
	text = replace(text, "alert", "")
	text = replace(text, "location", "")
	text = replace(text, "window.", "")
	text = replace(text, "(", "")
	text = replace(text, ")", "")
	text = replace(text, "img src", "")
      ReplaceTag2text = text
End Function


'add_address�� ġȯ �Լ� 
Function ReplaceFun(str)

			Dim return_str : return_str = ""

			if isnull( str ) or isempty( str ) Or str = "" Then
				ReplaceFun = ""
				'response.write "�˻���Ѵ�."
				'response.end
			Else
				'response.write "�˻��Ѵ�."
				'response.end
				'SQL Injection üũ�κ�=======================
				return_str = Trim(str) 
				return_str = Replace(return_str, "'", "''") 
				return_str = Replace(return_str, ";", "") 
				return_str = Replace(return_str, "--", "") 
				return_str = Replace(LCase(return_str), "@variable", "") 
				return_str = Replace(LCase(return_str), "@@variable", "") 
				return_str = Replace(return_str, "+", "") 
				return_str = Replace(LCase(return_str), "print", "") 
				'return_str = Replace(LCase(return_str), "set", "") 
				return_str = Replace(return_str, "%", "")
				return_str = Replace(LCase(return_str), "script", "")
				return_str = Replace(LCase(return_str), "onfocus", "")
			'	return_str = Replace(LCase(return_str), "or", "") 
				return_str = Replace(LCase(return_str), "union", "")
				return_str = Replace(LCase(return_str), "select", "") 
				return_str = Replace(LCase(return_str), "update", "") 
				return_str = Replace(LCase(return_str), "drop", "") 
				return_str = Replace(LCase(return_str), "delete", "") 
				return_str = Replace(LCase(return_str), "xp_", "")
				return_str = Replace(LCase(return_str), "having_", "") 
				return_str = Replace(LCase(return_str), "insert", "") 
				return_str = Replace(LCase(return_str), "openrowset", "")
			        return_str = Replace(return_str, "<", "&lt;") 
				return_str = Replace(return_str, ">", "&gt;") 

				return_str = Replace(return_str, "%3C", "") 
				return_str = Replace(return_str, "%3E", "") 
				return_str = Replace(return_str, "(", "&#40;") 
				return_str = Replace(return_str, ")", "&#41;") 
				return_str = Replace(return_str, "#", "&#35;") 
				return_str = Replace(return_str, "&", "&#38;") 
				return_str = Replace(return_str,"'","&#39;")
				return_str = Replace(return_str,"""", "&#34;")

				'�߰�
				return_str = replace(return_str, "&", "&amp;")
				return_str = replace(return_str, "<", "&lt;")
				return_str = replace(return_str, ">", "&gt;")
				return_str = replace(return_str, "--", "�Ѥ�")
				return_str = replace(return_str, "-", "��")
				return_str = replace(return_str, "|", "��")
				return_str = replace(return_str, "#", "��")
				return_str = replace(return_str, "'", "''")
				return_str = Replace(return_str, "%3D", "") 
				return_str = Replace(return_str, "script", "scrip") 
				return_str = Replace(return_str, "alert", "") 





				ReplaceFun = return_str

			End if
		end Function






%>