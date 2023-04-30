let cont = document.querySelector('.container');
let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let button = document.querySelector('.button');

let contHTML = "";
let article = {};

// запит існуючих статей на сервері і відображення заголовків
const getArticles = async () => {
	const result = await axios.get('/article');
    let res = result.data;
	let contHTML = "";
	for (let i=0; i<res.length; i++) {
		contHTML += `<p>${res[i].title}</p>`;
	}
	cont.innerHTML = contHTML;
  };

  getArticles();

 
// відправка нової статті на сервер, отримання і відображення оновленого масиву
const sendArticle = async () =>  {
	try {
	  const result = await axios.post('/add', article);
	  let res = result.data; // Дані, які повернув сервер
	  console.log(result.data); 
	  let contHTML = "";
	  for (let i=0; i<res.length; i++) {
		  contHTML += `<p>${res[i].title}</p>`;
	  }
	  cont.innerHTML = contHTML;
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
	let z = input.value;
	let t = textarea.value; 
	if (z && t) {
		article = {};
		article.title = z;
		article.text = t;
		input.value = '';
		textarea.value = '';
		sendArticle();		
	}
  }
  );

  
