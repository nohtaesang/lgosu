
## League of legend betting web site
<link>http://loltoto.com/</link>
<br>
LCK 의 승부를 예측하여 게임 머니를 걸고 결과에 따라 보상을 받을 수 있는 웹 사이트 
 
## Motivation
실제 서비스가 있는 프로젝트를 만들고 싶었다. 평소에 LCK를 보는 것을 즐겨했고 내가 승부를 얼마나 잘 맞추는지 궁금했다. 그것을 기록하기 위해 사이트를 만들었다.

## Tech/framework used
```
Front-end: react, redux, redux-thunk, redux-pender, axios
Back-end: node.js, express, mongodb 
```

## Screenshots
1. 메인 화면. 아직 시작되지 않은 경기들을 보여준다.
![1](https://user-images.githubusercontent.com/31440203/52531515-0e326100-2d5a-11e9-902f-e3a5011c3856.PNG)
<br><br>

2. 로그인. 네이버 로그인을 사용. 하루에 첫 접속시 2000원의 출석 보너스를 지급한다.
![2](https://user-images.githubusercontent.com/31440203/52531516-0e326100-2d5a-11e9-8ad5-9b9802eccacc.PNG)
<br><br>
3. 로그인 시, 오른쪽 상단에 소지금이 나온다. 시작 전인 경기에 배팅을 할 수 있다.
![3](https://user-images.githubusercontent.com/31440203/52531517-0e326100-2d5a-11e9-99fe-691daf20a1e5.PNG)
<br><br>
4. 예상하는 스코어를 클릭하고 금액을 입력, 배팅 버튼을 눌러서 배팅에 참여할 수 있다.
![4](https://user-images.githubusercontent.com/31440203/52531518-0e326100-2d5a-11e9-86e9-5e4572f8d917.PNG)
<br><br>
5. 배팅에 참여하면 배당율이 변경된다. 배팅 취소 버튼을 누르면 배팅을 취소할 수 있다.
![5](https://user-images.githubusercontent.com/31440203/52531519-0ecaf780-2d5a-11e9-917c-4dd42630b562.PNG)
<br><br>
6. admin 계정으로 로그인 했을 경우 볼 수 있는 화면이다. 새로운 경기를 등록하거나 등록된 경기의 상태 변경 및 삭제를 할 수 있다.
![6](https://user-images.githubusercontent.com/31440203/52531520-0ecaf780-2d5a-11e9-8db1-a9109c2fa2dc.PNG)
<br><br>
7. 만약 경기 시작 시간이 지났을 경우 자동으로 '경기중'으로 상태가 변경된다. '경기중' 탭으로 이동하여 확인할 수 있다.
![7](https://user-images.githubusercontent.com/31440203/52531521-0ecaf780-2d5a-11e9-9795-96d39aecd3e5.PNG)
<br><br>
8. 경기가 종료 됐다면 '경기 종료' 탭에서 확인할 수 있다. 배팅한 금액 x 배당률 만큼 돈을 받게 된다. 
![8](https://user-images.githubusercontent.com/31440203/52531522-0f638e00-2d5a-11e9-9d23-bbf6da18c194.PNG)
<br><br>
9. '나의 기록' 탭에서 지난 기록을 확인할 수 있다.
![9](https://user-images.githubusercontent.com/31440203/52531523-0f638e00-2d5a-11e9-891b-3db88983898e.PNG)
<br><br>
