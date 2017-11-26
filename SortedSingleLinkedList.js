//Code By Shawn O'Grady

/*
+In trying to learn JS I am trying to implement some common data structures

+This is my attempt at a sorted singly linked list
+Values in the queue will be of number type
+End goal is to have user enter prompts (in main function) in order to perform the following functions:
  1. insert a value to the list
  2. remove a value from the list
  3. print the entire list
  4. search the list for a specified value
  5. close the program

+I curently believe I can:
  -insert values to the list
    -at beginning, middle, or end of the list
  -print the list
+I still need to:
  -add functionality to remove a value
    -from beginning, middle, or end of the list
  -add functionality to search the list
  -add functionality to handle the case where the user inputs a duplicate value
  -add a user interface/main() function
*/
//using strict node for safety
"use strict";

//Node for a singly linked list:

function Node(){

  var value, nextNode;

  //a constructor:
  function createNode(input){
    this.value=input;
  }

  //function to set the next node value:
  function doSetNextNode(newNode){
    this.nextNode=newNode;
  }

  var NodeAPI={
    makeNode:createNode,
    setNextNode:doSetNextNode
  };
  return NodeAPI;
}

//sorted sll
function sortedSLL(){

  var head=Node();
  var tail=Node();

  //insert function
  function doInsert(input){
    var newNode=Node();
    newNode.makeNode(input);

    if(tail.value!=null){
      //there are things in the list
      /*
      three cases to consider:
        1. inserting a new head node
        2. inserting a new tail node
        3. inserting node in middle of list
      */
      if(input<head.value){
        //new head node
        newNode.setNextNode(head);
        head=newNode;
      }else{
         var tmp=head;
         var prevNode=head;
        //traverse list to find proper place for new node
        //do{
        while(tmp!=tail){
          if(tmp.value>input){
            //found the right place
            break;
          }
          prevNode=tmp;
          tmp=tmp.nextNode;
        }
        //}while(tmp!=tail);

        //at this point, we've either found the right place to place the node or are at the end of the list
        if(tmp==tail){
          //we're at the tail
          tail.setNextNode(newNode);
          tail=newNode;
        }else{
          //we're somewhere in the middle of the list
          prevNode.setNextNode(newNode);
          newNode.setNextNode(tmp);
        }

      }


    }else{
      //list is empty;
      head=newNode;
      tail=newNode;
    }
    console.log(input+" was inserted in to the list");
  }

  //remove function:
  function doRemove(input){

  }

  //search function:
  function doSearch(input){

  }

  //display function:
  function doPrint(){
    if(head.value!=null){
      //there are things in the list
      var listString="List contains(in order): \r";  //will hold entirety of list as single string for simple printing

      var tmp=head;
      listString=listString+tmp.value+"\r"; //add value to string

      //traverse list, adding values to string:
      while(tmp!=tail){
        tmp=tmp.nextNode;
        listString=listString+tmp.value+"\r"; //add value to string
      }
      console.log(listString);
    }else{
      //list is empty
      console.log("list is empty");
    }
  }

  var publicAPI={
    insert:doInsert,
    //remove:doRemove,
    //search:doSearch,
    print:doPrint
  };

  return publicAPI;

}

//testing basic functionality:
var list=sortedSLL();
list.print(); //"list is empty"

list.insert(2);
list.print(); //2

//testing if properly adds new tail nodes:
list.insert(3);
list.insert(6);
list.insert(7);
list.insert(8);
list.print(); //2, 3, 6, 7, 8

//testing if properly adds new head nodes:
list.insert(1);
list.insert(0);
list.print(); //0,1,2,3,6,7,8

//testing if properly adds new middle nodes:
list.insert(4);
list.insert(5);
list.print(); //0,1,2,3,4,5,6,7,8
