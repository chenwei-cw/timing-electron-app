window.onload = () => {
    console.log(window);
    // let closeBtn = document.getElementById('closeBtn');
    let timeDom = document.getElementById('time');
    let start = document.getElementById('start');
    let pause = document.getElementById('pause');
    let end = document.getElementById('end');
    let goOn = document.getElementById('goOn');

    let timeNum = 0;
    let timeInterval = null;

    //时间转换成合适的格式
    timeTranFunc(timeNum);

    start.addEventListener('click',()=>{
        // 通知
    //   new Notification('标题',{  body: '内容' }).show()
        if(timeInterval) return;
        //开始时间计时
        timeIntervalFunc();
        //隐藏开始按钮，显示暂停和结束按钮
        timingStatus('start');
    });

    end.addEventListener('click',()=>{
        if(timeInterval) {
            clearInterval(timeInterval);
            timeInterval = null;
            timeNum = 0;
            timeTranFunc(timeNum);
            timingStatus('end');
        }else{
            timeNum = 0;
            timeTranFunc(timeNum);
            timingStatus('end');
        }
    });

    pause.addEventListener('click',()=>{
        if(timeInterval) {
            clearInterval(timeInterval);
            timeInterval = null;
            timingStatus('pause');
        }
    });

    goOn.addEventListener('click',()=>{
        //开始时间计时
        timeIntervalFunc();
        timingStatus('goOn');
    });

    // closeBtn.addEventListener('click', () => {
    //   ipcRenderer.send('close-window');
    // });

// 监听主进程发送的事件
// ipcRenderer.on('close-window', () => {
//     // 关闭窗口
//     const window = require('electron').remote.getCurrentWindow();
//     window.close();
// });

    function timeTranFunc(timeNum){
        let second = timeNum%60;
        let minute = Math.floor(timeNum/60);
        let hour = Math.floor(minute/60);
            minute = minute%60;

        if(hour < 10) hour = '0'+String(hour)
        if(minute < 10) minute = '0'+String(minute)
        if(second < 10) second = '0'+String(second)

        timeDom.innerHTML =hour+':'+minute+'<span class="secondStyle">:'+second+'</span>';
    }
    function timeIntervalFunc(){
        timeInterval = setInterval(()=>{
            timeNum = timeNum+ 1;
            timeTranFunc(timeNum)
        },1000)
    }
    function timingStatus(bool){
        if(bool === 'start'){
            start.style.display = 'none';
            pause.style.display = 'inline-block';
            end.style.display = 'inline-block';
            timeDom.style.color = 'rgba(0,0,0,0.9)'
        }else if(bool === 'end'){
            start.style.display = 'inline-block';
            pause.style.display = 'none';
            end.style.display = 'none';
            goOn.style.display = 'none';
            timeDom.style.color = 'rgba(0,0,0,0.6)'
        }else if(bool === 'pause'){
            start.style.display = 'none';
            pause.style.display = 'none';
            end.style.display = 'inline-block';
            goOn.style.display = 'inline-block';
            timeDom.style.color = 'rgba(0,0,0,0.6)'
        }else if(bool === 'goOn'){
            goOn.style.display = 'none';
            pause.style.display = 'inline-block';
            end.style.display = 'inline-block';
            timeDom.style.color = 'rgba(0,0,0,0.9)'
        }
    }

};