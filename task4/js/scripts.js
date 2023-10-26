function openGame(){
  	const word = prompt('Введите слово', 'мадам');
  	const result=isPalindrom(word);
  	if(word.length>0){
  	alert(result);
  }
  else{
  	alert('Результата нет, слово не введено(');
  }
  };

  function isPalindrom(w){
  	const len = BigInt(w.length);
  	for(var i = BigInt(0); i <  BigInt(len/BigInt(2)); BigInt(i++)){
		if(w[i] != w[len-i-BigInt(1)])
		{
			return (w+' не палиндром!');
		}
	}
	return (w+' палиндром!');
  };