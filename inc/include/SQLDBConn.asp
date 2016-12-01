<%
Class clsDBHelper
	'Option Explicit

	Private DefaultConnString(0)
	Private DefaultConnection(0)

	'---------------------------------------------------
	' 클래스 초기화
	'--------------------------------------------------- 
	Private Sub Class_Initialize()
		Dim i
			DefaultConnString(0)  	= "DSN=CatchAPP_Admin;User Id=catch_a;Password=EnDerS1@;"								
		For i = 0 To UBound(DefaultConnection)
		
			SET DefaultConnection(i) = Nothing
		Next
	End Sub

	'---------------------------------------------------
	' 클래스 종료
	'---------------------------------------------------
	Private Sub Class_Terminate()
		Dim i

		For i = 0 To UBound(DefaultConnection) ' 열여 있는 커넥션은 닫는다
			If (Not DefaultConnection(i) Is Nothing) Then
				If (DefaultConnection(i).State = 1) Then
					DefaultConnection(i).Close
				End If
				SET DefaultConnection(i) = Nothing
			End If
		Next
	End Sub

	'---------------------------------------------------
	' SP를 실행하고, RecordSet을 반환한다.
	'---------------------------------------------------
	Public Function ExecSPReturnRS(spName, params, conNum, conn)
		Dim RS, cmd, i

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET RS = Server.CreateObject("ADODB.Recordset")
		SET cmd = Server.CreateObject("ADODB.Command")

		cmd.ActiveConnection = conn
		cmd.CommandText = spName
		cmd.CommandType = 4

		SET cmd = collectParams(cmd, params)
		'cmd.Parameters.Refresh

		RS.CursorLocation = 3
		RS.Open cmd, , 3, 1

		For i = 0 To cmd.Parameters.Count - 1
			If cmd.Parameters(i).Direction = 2 OR cmd.Parameters(i).Direction = 3 OR cmd.Parameters(i).Direction = 4 Then
				If IsObject(params) Then
					If params Is Nothing Then
						Exit For
					End If
				Else
					params(i)(4) = cmd.Parameters(i).Value
				End If
			End If
		Next

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing

		Set ExecSPReturnRS = rs
	End Function

	'---------------------------------------------------
	' SQL Query를 실행하고, RecordSet을 반환한다.
	'---------------------------------------------------
	Public Function ExecSQLReturnRS(strSQL, params, conNum, conn)
		Dim RS, cmd

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET RS = Server.CreateObject("ADODB.Recordset")
		SET cmd = Server.CreateObject("ADODB.Command")
		    cmd.CommandTimeout = 200

		cmd.ActiveConnection = conn
		cmd.CommandText = strSQL
		cmd.CommandType = 1
		SET cmd = collectParams(cmd, params)

		RS.CursorLocation = 3
		RS.Open cmd, , 3, 1

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing
		'SET RS.ActiveConnection = Nothing

		SET ExecSQLReturnRS = RS
	End Function
	'---------------------------------------------------
	' SP를 실행한다.(RecordSet 반환없음) TimeOut 미설정
	'---------------------------------------------------
	Public Sub ExecSP(strSP, params, conNum, conn)
		Dim cmd, i

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET cmd = Server.CreateObject("ADODB.Command")

		cmd.ActiveConnection = conn
		cmd.CommandText = strSP
		cmd.CommandType = 4
		SET cmd = collectParams(cmd, params)

		cmd.Execute , , 128

		For i = 0 To cmd.Parameters.Count - 1
			If cmd.Parameters(i).Direction = 2 OR cmd.Parameters(i).Direction = 3 OR cmd.Parameters(i).Direction = 4 Then
				If IsObject(params) Then
					If params Is Nothing Then
						Exit For
					End If
				Else
					params(i)(4) = cmd.Parameters(i).Value
				End If
			End If
		Next

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing
	End Sub
	'---------------------------------------------------
	' SP를 실행한다.(RecordSet 반환없음) TimeOut 설정
	'---------------------------------------------------
	Public Sub ExecSPNoTimeOut(strSP, params, conNum, conn)
		Dim cmd, i

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET cmd = Server.CreateObject("ADODB.Command")

		cmd.ActiveConnection = conn
		cmd.CommandText = strSP
		cmd.CommandType = 4
		cmd.CommandTimeout = 0
		SET cmd = collectParams(cmd, params)

		cmd.Execute , , 128

		For i = 0 To cmd.Parameters.Count - 1
			If cmd.Parameters(i).Direction = 2 OR cmd.Parameters(i).Direction = 3 OR cmd.Parameters(i).Direction = 4 Then
				If IsObject(params) Then
					If params Is Nothing Then
						Exit For
					End If
				Else
					params(i)(4) = cmd.Parameters(i).Value
				End If
			End If
		Next

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing
	End Sub
	'---------------------------------------------------
	' SQL Query를 실행한다.(RecordSet 반환없음)
	'---------------------------------------------------
	Public Sub ExecSQL(strSQL, params, conNum, conn)
		Dim cmd

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET cmd = Server.CreateObject("ADODB.Command")

		cmd.ActiveConnection = conn
		cmd.CommandText = strSQL
		cmd.CommandType = 1
		cmd.CommandTimeout = 60000
		SET cmd = collectParams(cmd, params)

		cmd.Execute , , 128

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing
	End Sub

	'---------------------------------------------------
	' SQL Query를 실행한다. timeout 값을 올려준다. DTS 실행용
	'---------------------------------------------------
	Public Sub ExecDTS(strSQL, params, conNum, conn)
		Dim cmd

		SET conn = getConn(conNum, conn) ' 커넥션 연결
		SET cmd = Server.CreateObject("ADODB.Command")

		cmd.ActiveConnection = conn
		cmd.CommandText = strSQL
		cmd.CommandType = 1
		cmd.CommandTimeout = 60000
		SET cmd = collectParams(cmd, params)

		cmd.Execute , , 128

		SET cmd.ActiveConnection = Nothing
		SET cmd = Nothing
	End Sub

	'---------------------------------------------------
	' 트랜잭션을 시작하고, Connetion 개체를 반환한다.
	'---------------------------------------------------
	Public Function BeginTrans(conNum)
		Dim conn

		SET conn = getConnection(conNum)
		conn.BeginTrans
		SET BeginTrans = conn
	End Function

	'---------------------------------------------------
	' 활성화된 트랜잭션을 커밋하고 종료한다.
	'---------------------------------------------------
	Public Sub CommitTrans(conNum)
		If NOT DefaultConnection(conNum) Is Nothing Then
			DefaultConnection(conNum).CommitTrans
			DefaultConnection(conNum).Close
			SET DefaultConnection(conNum) = Nothing
		End If
	End Sub

	'---------------------------------------------------
	' 활성화된 트랜잭션을 롤백하고 종료한다.
	'---------------------------------------------------
	Public Sub RollbackTrans(conNum)
		If NOT DefaultConnection(conNum) Is Nothing Then
			DefaultConnection(conNum).RollbackTrans
			DefaultConnection(conNum).Close
			SET DefaultConnection(conNum) = Nothing
		End If
	End Sub

	'---------------------------------------------------
	' 배열로 매개변수를 만든다.
	'---------------------------------------------------
	Public Function MakeParam(PName, PType, PDirection, PSize, PValue)
		MakeParam = Array(PName, PType, PDirection, PSize, PValue)
	End Function

	'---------------------------------------------------
	' 매개변수 배열 내에서 지정된 이름의 매개변수 값을 반환한다.
	'---------------------------------------------------
	Public Function GetValue(params, paramName)
		Dim param

		For Each param In params
			If param(0) = paramName Then
				GetValue = param(4)
				Exit Function
			End If
		Next
	End Function

	'---------------------------------------------------
	' 커넥션을 닫는다
	'---------------------------------------------------
	Public Sub Dispose(conNum)
		If (Not DefaultConnection(conNum) Is Nothing) Then
			If (DefaultConnection(conNum).State = 1) Then
				DefaultConnection(conNum).Close
			End If
			SET DefaultConnection(conNum) = Nothing
		End If
	End Sub

	'---------------------------------------------------------------------------
	' Array로 넘겨오는 파라메터를 Parsing 하여 Parameter 객체를
	' 생성하여 Command 객체에 추가한다.
	'---------------------------------------------------------------------------
	Private Function collectParams(cmd, argparams)
		Dim params, u, v, i, l

		If VarType(argparams) = 8192 OR VarType(argparams) = 8204 OR VarType(argparams) = 8209 Then
			params = argparams
			For i = LBound(params) To UBound(params)
				l = LBound(params(i))
				u = UBound(params(i))
				' Check for nulls.
				If u - l = 4 Then
					If Trim(params(i)(4)) = "" Then
						v = Null
					Else
						v = Trim(params(i)(4))
					End If

					cmd.Parameters.Append cmd.CreateParameter(params(i)(0), params(i)(1), params(i)(2), params(i)(3), v)
				End If
			Next
			SET collectParams = cmd
			Exit Function
		Else
			SET collectParams = cmd
		End If
	End Function

	'---------------------------------------------------
	' 커넥션을 연결하여 리턴
	'---------------------------------------------------
	Public Function getConnection(conNum)

		If (DefaultConnection(conNum) IS Nothing) Then
			SET DefaultConnection(conNum) = Server.CreateObject("ADODB.Connection")
		End If

		If (DefaultConnection(conNum).State = 0) Then
			DefaultConnection(conNum).Open DefaultConnString(conNum)
		End If

		SET getConnection = DefaultConnection(conNum)
	End Function

	'---------------------------------------------------
	' 넘어온 커넥션 살아 있는지 검사 후 없을경우 만들어 리턴
	'---------------------------------------------------
	Public Function getConn(conNum, conn)
		If IsObject(conn) Then
			If (conn Is Nothing) Then
				SET getConn = getConnection(conNum)
			Else
				If (conn.State = 1) Then ' conn이 열여있는 커넥션이라면 사용
					SET getConn = conn
				Else
					SET getConn = getConnection(conNum)
				End If
			End If
		Else ' 아니면 생성
			SET getConn = getConnection(conNum)
		End If
	End Function

	'---------------------------------------------------
	' DB 연결 정보만을 리턴
	'---------------------------------------------------
	Public Function getConnStr(conNum)
		getConnStr = DefaultConnString(conNum)
	End Function
		
End Class

SET Enders = new clsDBHelper
%>