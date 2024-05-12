console.log("Waiting scripts started succesfully");
const username=sessionStorage.getItem("cryptid-game-username");
const goal=sessionStorage.getItem("cryptid-game-action");
const code=sessionStorage.getItem("cryptid-game-room-number");
const mode=sessionStorage.getItem("cryptid-game-mode");
const num_players = sessionStorage.getItem("cryptid-num-players");
const match_id = sessionStorage.getItem("cryptid-match-id");
console.log(`Username:${username}`);
console.log(`Goal:${goal}`);
console.log(`Room number:${code}`);
console.log(`Game mode:${mode}`);
console.log(`Number of Players:${num_players}`);
var socket = null;
if (goal=="local"){
    //local game
}
else{
    socket = io();
    socket.on("identity", (identity) => {
        console.log("Received identity:", identity);
        socket.emit("reconnect",{user:username,action:goal,identity:match_id});
    });

    socket.on("another",(data)=>{
        console.log("another")
        console.log(data);
    });

    socket.on("others",(data)=>{
        console.log("others");
        console.log(data);
    });

    socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });

}
