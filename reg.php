<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/main.css">
	<link href='https://fonts.googleapis.com/css?family=Raleway:400,400italic,600,800,800italic,900italic,300' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
    <header>
  <div class="container">
    <h1><a href="/">Заголовок</a></h1>
    <nav>
      <a href="index.php">Главная</a>
      <a href="#">Контакты</a>
      <a href="reg.php">Регистрация</a>
    </nav>
  </div>
</header>

<?php

// Регистрация

# Соединямся с БД
mysql_connect("localhost", "root", "");
mysql_select_db("baza33");

if(isset($_POST['submit']))
{
    $err = array();

    # проверям логин
    if(!preg_match("/^[a-zA-Z0-9]+$/",$_POST['login']))
    {
        $err[] = "Логин может состоять только из букв английского алфавита и цифр";
    }
    
    if(strlen($_POST['login']) < 3 or strlen($_POST['login']) > 30)
    {
        $err[] = "Логин должен быть не меньше 3-х символов и не больше 30";
    }
    
    # проверяем, не существует ли пользователя с таким именем
    $query = mysql_query("SELECT COUNT(user_id) FROM users WHERE user_login='".mysql_real_escape_string($_POST['login'])."'");
    if(mysql_result($query, 0) > 0)
    {
        $err[] = "Пользователь с таким логином уже существует в базе данных";
    }
    
    # Если нет ошибок, то добавляем в БД нового пользователя
    if(count($err) == 0)
    {
        
        $login = $_POST['login'];
        
        # Убираем лишние пробелы и делаем двойное шифрование
        $password = md5(md5(trim($_POST['password'])));
        
        mysql_query("INSERT INTO users SET user_login='".$login."', user_password='".$password."'");
        header("Location: login.php"); exit();
    }
    else
    {
        print "<b>При регистрации произошли следующие ошибки:</b><br>";
        foreach($err AS $error)
        {
            print $error."<br>";
        }
    }
}

?>

<form method="POST">

Логин <input name="login" type="text" class="feedback-input">   
Пароль <input name="password" type="password" class="feedback-input">
<input name="submit" type="submit" value="Зарегистрироваться">
  </form>



 



</body>
</html>