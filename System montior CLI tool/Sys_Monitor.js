const si = require("systeminformation");


const {Command} = require("commander");


// We have used object destructuring here.we have extracted a class from commander module which is "Command" not command.we can give it a custom name too like command,mycommand,cmd etc.


// const {Command:command} = require("commander");





const program = new Command();





program


.name("System-Info")


.description("Provides all the information related to system monitoring")


.version("1.0.0");





// program.option('--cpuInfo',"Provides the information related to CPU");








// const Operations = program.opts();














program.command('cpuInfo')


.description("Provides CPU related information")


.action(()=>{


    const cpuInfo = si.cpu();


    cpuInfo.then((data)=>{


        console.log(data);


    })


    .catch((err)=>{


        console.log(err);


    })


})








program.command('RAMInfo')


.description("Provides real-time RAM related information")


.action(()=>{


    const ramInfo = si.mem();


    ramInfo.then((data)=>{


        console.log(data);


    })


    .catch((err)=>{


        console.log(err);


    })


})





program.command('HdRAMInfo')


.description("Provides Hardware-level RAM related information")


.action(()=>{


    const hdRam = si.memLayout();


    hdRam.then((data)=>{


        console.log(data);


    })


    .catch((err)=>{


        console.log(err);


    })


})





si.cp





program.parse()











// console.log(sysInfo)