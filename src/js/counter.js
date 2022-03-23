export default class{
    constructor(){
        this.textArea = document.querySelector('#text__area');
        this.btn = document.querySelector('#text__btn')
        this.lettersObj = {
            a:0,ą:0,b:0,c:0,ć:0,d:0,e:0,ę:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,ł:0,m:0,n:0,o:0,ó:0,p:0,r:0,s:0,ś:0,t:0,u:0,w:0,x:0,y:0,z:0,ż:0,ź:0
        };
        this.btn.addEventListener('click',()=>{ 
            this.takeValue();
        });
        this.btn.addEventListener('mousedown', ()=> {
            this.btnBevavior('rgb(68, 44, 90)'),
            this.textArea.style.color = 'grey';
        });
        this.btn.addEventListener('mouseup', ()=> this.btnBevavior('rgb(117, 58, 172)'));

        this.textArea.addEventListener('click', ()=>this.focusOnTextArea());
        this.letterCounter = document.querySelector('.letter-counter');
    }

    btnBevavior(bcg){
        this.btn.style.backgroundColor = bcg;
    }

    focusOnTextArea(){
        this.textArea.value = '';
        this.textArea.style.color = 'black';
        this.letterCounter.textContent = '';
    }

    takeValue(){
        if(this.textArea.value === ''|| this.textArea.value === 'Wpisz lub wklej tekst') alert('Wpisz tekst')
        else {
            let value = this.textArea.value.toLowerCase();
            this.removeCharacters([...value]);
        }
    }
    removeCharacters(value){
        let lettersWithoutCharacters =[];
        value.forEach(e=>{
            if(e !== " " && e !== ',' && e !== '['&&e !== ']'&& e !== "{" && e !== '}' && e !== ':'&&e !== ';'&& e !== "." && e !== '?' && e !== '!'&&e !== '@' && e !== '1' && e !== '2'&&e !== '3'&& e !== "4" && e !== '5' && e !== '6' && e !== '7' && e !== '8'&&e !== '9')lettersWithoutCharacters.push(e);
        })
        this.countTheLetters(lettersWithoutCharacters);
    }

    countTheLetters(letters){
        for(const key in this.lettersObj){
            this.lettersObj[key] = 0;
        }
        for(let i=0; i<letters.length; i++){
            for(const key in this.lettersObj){
                if(letters[i] === key){
                    this.lettersObj[key] += 1;
                }
            }
        }  
        this.viewResaults(letters);
    }

    viewResaults(letters){
        this.letterCounter.innerHTML = `<p class="letter-counter__header-sum">Łącznie liter: ${letters.length}</p><p class="letter-counter__header-letter lc-left">Użyte litery</p><p class="letter-counter__header-percent lc-middle">Procent</p><p class="letter-counter__header-counter lc-right">Liczba liter</p>`;
        let sortable = [];
          for(const key in this.lettersObj){
            if(this.lettersObj[key]>0){
              sortable.push([key, this.lettersObj[key]])
            }
          } 
        let sorted = sortable.sort((a,b)=>{
              return a[1] - b[1];
          }).reverse();
        
        for(let i =0;i<sorted.length;i++){
            let letter = document.createElement('div');
            letter.textContent = sorted[i][0];
            letter.classList.add('lc-letter');
            this.letterCounter.appendChild(letter);

            let percentWrapper = document.createElement('div');
            percentWrapper.classList.add('lc-percent');
            this.letterCounter.appendChild(percentWrapper);

            let percentField = document.createElement('div');
            percentField.classList.add('lc-percent__field');
            percentWrapper.appendChild(percentField);

            let percentFieldInside = document.createElement('div');
            percentFieldInside.classList.add('lc-percent__field-inside');
            percentFieldInside.style.width = `${((sorted[i][1]/letters.length)*100).toFixed(1)}%`;

            percentField.appendChild(percentFieldInside);

            let percentValue = document.createElement('p');
            percentValue.classList.add('lc-percent__percent');
            percentValue.textContent = `${((sorted[i][1]/letters.length)*100).toFixed(1)}%`;
            percentWrapper.appendChild(percentValue);

            let number = document.createElement('div');
            number.classList.add('lc-counter');
            number.textContent = sorted[i][1];
            this.letterCounter.appendChild(number);
        }
    }
}