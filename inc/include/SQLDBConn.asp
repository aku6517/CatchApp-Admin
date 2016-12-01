<%
Class clsDBHelper
	'Option Explicit

	Private DefaultConnString(0)
	Private DefaultConnection(0)

	'---------------------------------------------------
	' Ŭ���� �ʱ�ȭ
	'--------------------------------------------------- 
	Private Sub Class_Initialize()
		Dim i
			DefaultConnString(0)  	= "DSN=CatchAPP_Admin;User Id=catch_a;Password=EnDerS1@;"								
		For i = 0 To UBound(DefaultConnection)
		
			SET DefaultConnection(i) = Nothing
		Next
	End Sub

	'---------------------------------------------------
	' Ŭ���� ����
	'---------------------------------------------------
	Private Sub Class_Terminate()
		Dim i

		For i = 0 To UBound(DefaultConnection) ' ���� �ִ� Ŀ�ؼ��� �ݴ´�
			If (Not DefaultConnection(i) Is Nothing) Then
				If (DefaultConnection(i).State = 1) Then
					DefaultConnection(i).Close
				End If
				SET DefaultConnection(i) = Nothing
			End If
		Next
	End Sub

	'---------------------------------------------------
	' SP�� �����ϰ�, RecordSet�� ��ȯ�Ѵ�.
	'---------------------------------------------------
	Public Function ExecSPReturnRS(spName, params, conNum, conn)
		Dim RS, cmd, i

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' SQL Query�� �����ϰ�, RecordSet�� ��ȯ�Ѵ�.
	'---------------------------------------------------
	Public Function ExecSQLReturnRS(strSQL, params, conNum, conn)
		Dim RS, cmd

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' SP�� �����Ѵ�.(RecordSet ��ȯ����) TimeOut �̼���
	'---------------------------------------------------
	Public Sub ExecSP(strSP, params, conNum, conn)
		Dim cmd, i

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' SP�� �����Ѵ�.(RecordSet ��ȯ����) TimeOut ����
	'---------------------------------------------------
	Public Sub ExecSPNoTimeOut(strSP, params, conNum, conn)
		Dim cmd, i

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' SQL Query�� �����Ѵ�.(RecordSet ��ȯ����)
	'---------------------------------------------------
	Public Sub ExecSQL(strSQL, params, conNum, conn)
		Dim cmd

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' SQL Query�� �����Ѵ�. timeout ���� �÷��ش�. DTS �����
	'---------------------------------------------------
	Public Sub ExecDTS(strSQL, params, conNum, conn)
		Dim cmd

		SET conn = getConn(conNum, conn) ' Ŀ�ؼ� ����
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
	' Ʈ������� �����ϰ�, Connetion ��ü�� ��ȯ�Ѵ�.
	'---------------------------------------------------
	Public Function BeginTrans(conNum)
		Dim conn

		SET conn = getConnection(conNum)
		conn.BeginTrans
		SET BeginTrans = conn
	End Function

	'---------------------------------------------------
	' Ȱ��ȭ�� Ʈ������� Ŀ���ϰ� �����Ѵ�.
	'---------------------------------------------------
	Public Sub CommitTrans(conNum)
		If NOT DefaultConnection(conNum) Is Nothing Then
			DefaultConnection(conNum).CommitTrans
			DefaultConnection(conNum).Close
			SET DefaultConnection(conNum) = Nothing
		End If
	End Sub

	'---------------------------------------------------
	' Ȱ��ȭ�� Ʈ������� �ѹ��ϰ� �����Ѵ�.
	'---------------------------------------------------
	Public Sub RollbackTrans(conNum)
		If NOT DefaultConnection(conNum) Is Nothing Then
			DefaultConnection(conNum).RollbackTrans
			DefaultConnection(conNum).Close
			SET DefaultConnection(conNum) = Nothing
		End If
	End Sub

	'---------------------------------------------------
	' �迭�� �Ű������� �����.
	'---------------------------------------------------
	Public Function MakeParam(PName, PType, PDirection, PSize, PValue)
		MakeParam = Array(PName, PType, PDirection, PSize, PValue)
	End Function

	'---------------------------------------------------
	' �Ű����� �迭 ������ ������ �̸��� �Ű����� ���� ��ȯ�Ѵ�.
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
	' Ŀ�ؼ��� �ݴ´�
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
	' Array�� �Ѱܿ��� �Ķ���͸� Parsing �Ͽ� Parameter ��ü��
	' �����Ͽ� Command ��ü�� �߰��Ѵ�.
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
	' Ŀ�ؼ��� �����Ͽ� ����
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
	' �Ѿ�� Ŀ�ؼ� ��� �ִ��� �˻� �� ������� ����� ����
	'---------------------------------------------------
	Public Function getConn(conNum, conn)
		If IsObject(conn) Then
			If (conn Is Nothing) Then
				SET getConn = getConnection(conNum)
			Else
				If (conn.State = 1) Then ' conn�� �����ִ� Ŀ�ؼ��̶�� ���
					SET getConn = conn
				Else
					SET getConn = getConnection(conNum)
				End If
			End If
		Else ' �ƴϸ� ����
			SET getConn = getConnection(conNum)
		End If
	End Function

	'---------------------------------------------------
	' DB ���� �������� ����
	'---------------------------------------------------
	Public Function getConnStr(conNum)
		getConnStr = DefaultConnString(conNum)
	End Function
		
End Class

SET Enders = new clsDBHelper
%>