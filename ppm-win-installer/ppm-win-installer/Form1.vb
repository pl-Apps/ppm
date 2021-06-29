Public Class Form1

    Dim brwsFolder As New FolderBrowserDialog

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        TextBox1.ReadOnly = True
        TextBox1.Text = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + "\ppm"
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If (brwsFolder.ShowDialog() = DialogResult.OK) Then
            TextBox1.Text = brwsFolder.SelectedPath
        End If
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        Try
            IO.Directory.CreateDirectory(TextBox1.Text)
        Catch
        End Try
        Dim target_data As Byte() = My.Resources.ppm
        Dim zip_target_name As String = IO.Path.GetTempFileName()
        My.Computer.FileSystem.WriteAllBytes(zip_target_name, target_data, False)
        IO.Compression.ZipFile.ExtractToDirectory(zip_target_name, TextBox1.Text)
        My.Computer.FileSystem.DeleteFile(zip_target_name)
        If (CheckBox1.Checked) Then
            Environment.SetEnvironmentVariable("PATH", Environment.GetEnvironmentVariable("PATH") + ";" + TextBox1.Text)
        End If
        MsgBox("Installed", MsgBoxStyle.Information, "Finished")
        Environment.Exit(0)
    End Sub
End Class
