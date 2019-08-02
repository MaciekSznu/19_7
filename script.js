class Stopwatch extends React.Component {//szablon klasy
  constructor(props) {
    super(props)
    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      savedTimes: [], 
    }
  }

  reset() {//metoda resetująca pomiar
    this.setState ({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format(times) {//metoda ustawiająca format wyświetlania czasu mm:ss:msms
    return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }
    
  start() {
    if (!this.state.running) {//sprawdzamy czy stoper "chodzi"
        this.setState({
          running: true,//jesli nie działa to go włączamy
          watch: setInterval(() => this.step(), 10),//zmienieamy wartość co 10 ms odpalając metodę step, jako pierwszy argument callback (akyualny stan)
        })
    }
  }

  step() {
    if (!this.state.running) return;//sprawdzamy czy stoper "chodzi"
    this.calculate(); 
  }

  calculate() {//przelicza milisekundy na sekundy a sekundy na minuty i odpowiednio dodaje/zeruje
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
        times.seconds += 1;
        times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
        times.minutes += 1;
        times.seconds = 0;
    }
    this.setState({times});
  }

  stop() {
    this.setState ({
      running: false,
    })
    clearInterval(this.state.watch);
  }

  zero() {
    this.state.running = false;
    this.reset();
  }

  saveTime() {
    let savedTime = this.format(this.state.times);
    if (savedTime !== this.state.savedTimes[this.state.savedTimes.length - 1]){
      this.setState({
        savedTimes: [...this.state.savedTimes, savedTime]
      })
    }
    //this.formatTimeTable();
  }

  clearTimeTable() {
    this.setState({
      savedTimes: [],
    })
    this.formatTimeTable();
  }

  formatTimeTable () {
    let savedItems = [];
    for (let i = 0; i < this.state.savedTimes.length; i++) {
    savedItems.push(<li>{this.state.savedTimes[i]}</li>)
    }
    return savedItems.map(savedItems => (
        <li>{savedItems}</li>
    )); 
  }

  render() {
    return (            
        <div className={'app'}>
          <nav className={'controls'}>
                <a href={"#"} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                <a href={"#"} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
                <a href={"#"} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
          </nav>
          <div className={'stopwatch'}>
            {this.format()}
          </div>
          <nav className={'times-controls'}>
            <a href={"#"} className={'button'} id={'save'} onClick={() => this.saveTime()}>Save Time</a>
            <a href={"#"} className={'button'} id={'resetTable'} onClick={() => this.clearTimeTable()}>Clear times</a>
          </nav>
          <div>
            <ul className={'results'}>{this.formatTimeTable()}</ul>
          </div>
        </div>            
    );
  }
}

function pad0(value) {//funkcja ustawijąca 0 na początku jeśli pomiar jest jednocyfrowy
  let result = value.toString();
  if (result.length < 2) {
      result = '0' + result;
  }
  return result;
}

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);
// const stopwatch = new Stopwatch(//instancja klasy
// document.querySelector('.stopwatch'));

// const results = document.querySelector('.results');

// let startButton = document.getElementById('start'); //metoda dla przycisku start
// startButton.addEventListener('click', () => stopwatch.start());

// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());

// let resetButton = document.getElementById('reset');
// resetButton.addEventListener('click', () => stopwatch.zero());

// let saveButton = document.getElementById('save');
// saveButton.addEventListener('click', () => stopwatch.saveTime());

// let clearButton = document.getElementById('cleartimes');
// clearButton.addEventListener('click', () => stopwatch.clearTimes());