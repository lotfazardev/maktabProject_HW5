//++++++++++++++++++++++++++ the sky is the limit ++++++++++++++++++++++++++//

/* --coded by mohammad hossien lotfazar-- 
    --M. SHOBERI master of this course--    
*/
function isInRange(numToCheck = 0, array = []){
    for(let i = 0 ; i < array.length ; i++){
        if(typeof array[i] == "number"){
            if(numToCheck == array[i]){
                return true ; 
            }
        }else{
            if((array[i][0] <= numToCheck) && (array[i][1] >= numToCheck)){
                return true ; 
            }
        }
    }
    return false;
}
function g2j(gy,gm,gd){
    let g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    let jy=(gy<=1600)?0:979;
    gy-=(gy<=1600)?621:1600;
    let gy2=(gm>2)?(gy+1):gy;
    let days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100))
            +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(parseInt(days/12053));
    days%=12053;
    jy+=4*(parseInt(days/1461));
    days%=1461;
    jy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    let jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
    let jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
}
HW5 ={ 
    Q1 : (email="")=>{
        const accRange = [[48,57],[64,90],[97,122],45,46,95]
        if(email.length > 256){
            console.log("max length overflow")
            return false ;
        }
        // char checker
        for(let i = 0 ; i < email.length ; i++){
            if(!isInRange(email.charCodeAt(i), accRange)){
                console.log(`invalid "char" entry`)
                return false ;
            }
        }
        email = email.split("@")
        // @ count checker
        if(email.length != 2){
            console.log(`"@" count error`)
            return false ; 
        }
        // username and domain is empty checker
        let username = email[0].split(".")
        let domain = email[1].split(".")
        if( ~username.indexOf("") || ~domain.indexOf("")){
            console.log(`empty "postfix or prefix"`)
            return false
        }
        return true ;
    },
    Q2:(phoneNumber = "+989038701184")=>{
        const zeroForms = ["00","+98","0"]
        const irOperatorPrefix = {
            MCI : [[910,919],990],
            MTN : [930,933,935,936,937,938,939,901,902,903],
            RIGHTEL : [0920,0921],
            MTCE : [931],
            TALIYA:[932],
            TKC:[934]
        }
        for(let i of zeroForms){
            if(phoneNumber.indexOf(i) == 0){
                phoneNumber = phoneNumber.slice(i.length,phoneNumber.length)
            }
        }
        if(phoneNumber.length != 10){
            console.log(`invalid length`)
            return false;
        }
        let prefix = phoneNumber.slice(0,3)
        for(let i in irOperatorPrefix){
            if(isInRange(prefix, irOperatorPrefix[i])){
                return true;
            }
        }
        console.log(`invalid prenumber`)
        return false
    },
    Q3:(userName="example")=>{
        const userRange = [[48,57],[65,90],[97,122],46,95]
        for(let i = 0 ; i < userName.length ; i++){
            if(!isInRange(userName.charCodeAt(i), userRange)){
                console.log(`invalid "char" entry`)
                return false ;
            }
        }
        return true
    },
    Q4:(userName="example", userList=[])=>{
        if(!HW5.Q3(userName)){
            console.log(`invalid "char" entry`)
            return false ;
        }
        for(let i of userList){
            if(userName == i){
                console.log("this username is already taken")
                return false;
            }
        }
        return true
    },
    Q5:(countOfNum = 1)=>{
        let ans = [] ,tmp;
        for(let i = 0 ; i < countOfNum ; i++ ){
            inner:while(1){
                tmp = Math.floor( Math.random() * (60000 - 1000) ) + 1000
                if(~ans.indexOf(tmp)){
                    continue inner;
                }else{
                    ans.push(tmp)
                    break inner;
                }
            }
        }
        return ans
    },
    Q6: function  mergeObjects(){
        return Object.assign({},...arguments)
    },
    Q7: (baseRange = [1,100], targetRange = [1,5], num = 70) => {
        let ratio = (targetRange[1] - targetRange[0] + 1 ) / (baseRange[1] - baseRange[0] + 1 )
        if(ratio == Infinity || ratio == -Infinity){
            console.log("like not in range")
            return null;
        }
        return ((num - baseRange[0] + 1 ) * ratio ) + targetRange[0] - 1
    },
    Q8: (arrayArg = [])=>{
        let shuffled = [], tmp;
        while(arrayArg.length){
            tmp = Math.floor( Math.random() * arrayArg.length ) 
            shuffled.push(arrayArg.splice(tmp,1)) 
        }
        return shuffled
    },
    Q9 : (stringArg="0001/01/01")=>{
        const ETF = "۰۱۲۳۴۵۶۷۸۹" ;
        let ans = g2j(...stringArg.split("/").map((elem)=> +elem)).map((elem)=>String(elem).split("").map((subElem) => ETF[+subElem] ).join("")).join("/");
        return ans ;
    }
}
// test section
// console.log(HW5.Q1("test it your self"));
// console.log(HW5.Q2("009693031474"));
// console.log(HW5.Q3("fat_alon.e"));
// console.log(HW5.Q4("user_example.",["user_example."]));
// console.table(HW5.Q5(10))
// console.table(HW5.Q6({ali:"reza"},{mohammad:"hassan"}))
// console.log(HW5.Q7([-15,-3],[100,120],-5))
// console.table(HW5.Q8([1,2,3,4,5,6,7,8,9]))
// console.log(HW5.Q9("2020/03/02"))