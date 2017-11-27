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
    -prevent user from inserting duplicate value
  -print the list
  -remove a value from the list
    -from beginning, middle, or end of the list
  -search the list for a value
+I still need to:
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
      var inList=doSearch(input); //variable to see if value to be added is duplicate of one already in list
      if(inList==false){
        //adding new unique value to list
        if(input<head.value){
          //new head node
          newNode.setNextNode(head);
          head=newNode;
          //console.log(input+" was inserted at the beginning of the list");
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
          if(tmp==tail&&tmp.value<input){
            //we're at the tail
            tail.setNextNode(newNode);
            tail=newNode;
            //console.log(input+" was inserted at the end of the list");
          }else{
            //we're somewhere in the middle of the list
            prevNode.setNextNode(newNode);
            newNode.setNextNode(tmp);
            //console.log(input+" was inserted in to the middle of the list");
          }
        }
        console.log(input+" was inserted in to the list");

      }else{
        //Adding duplicate value
        console.log(input+" is already in the list, cannot add duplicate values");
      }

    }else{
      //list is empty;
      head=newNode;
      tail=newNode;
      console.log(input+" was inserted in to the list");
    }
  }

  //remove function:
  function doRemove(input){
    if(head.value!=null){
      //there are things in the list

      var found=doSearch(input);  //see if the value is even in the list
      if(found==true){
        //value to delete is in the list
        /*
        three cases to consider:
          1. deleting the head node
          2. deleting the tail node
          3. deleting node in middle of list
        */
        var last=isLast();
        if(last==true){
          //deleting the last item in the list
          head=Node();
          tail=Node();
        }else{
          if(head.value==input){
            //deleting head node
            head=head.nextNode;
          }else{
            //deleting middle node or tail node
            var tmp=head;
            var prevNode=head;
            //traverse list to find node
            while(tmp!=tail){
              if(tmp.value==input){
                //found it
                break;
              }
              prevNode=tmp;
              tmp=tmp.nextNode;
            }

            //at this point, we've either found the node or are at the end of the list
            if(tmp==tail){
              //deleting the tail node
              tail=prevNode;
            }else{
              //deleting a middle node
              prevNode.setNextNode(tmp.nextNode);
            }

          }
        }
        console.log(input+" has been removed from the list");

      }else{
        console.log(input+" is not in the list");
      }


    }else{
      //list is empty
      console.log("list is empty, cannot remove an item");
    }
  }

  //search function:
  function doSearch(input){
    //this function returns a boolean value, which simplifies the other functions
    var found=false;  //returned value
    if(head.value!=null){
      //there are things in the list
      var tmp=head;

      //traverse list searching for specific value
      //do{
      while(tmp!=tail){
        if(tmp.value==input){
          //value found
          break;
        }
        tmp=tmp.nextNode;
      }
      //}while(tmp!=tail);

      //now, we're either at the end of the list or have found the value
      if(tmp.value==input){
        //console.log(input+" was found in the list");
        found=true;
      }else{
        //console.log(input+" was not found in the list");
      }
    }else{
      //list is empty
      console.log("list is empty, cannot search for a value");
    }
    return found;
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

  //helper function which checks if there is more than one item in the list
  function isLast(){
    var last=false;
    if(head==tail){
      last=true;
    }
    return last;
  }
  var publicAPI={
    insert:doInsert,
    remove:doRemove,
    search:doSearch,
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

//testing to see if properly removes head nodes:
list.remove(0);
list.remove(1);
list.print(); //2,3,4,5,6,7,8

//testing to see if properly removes middle nodes:
list.remove(4);
list.remove(5);
list.remove(6);
list.print(); //2,3,7,8

//testing to see if properly removes tail nodes:
list.remove(8);
list.remove(7);
list.remove(3);
list.print(); //2
list.remove(2);
list.print(); //"list is empty"
list.remove(2); //"list is empty, cannot remove an item"

//testing to see if properly refills:
list.insert(10);
list.insert(11);
list.insert(14);
list.insert(12);
list.insert(13);
list.insert(9);
list.remove(2); //"2 is not in the list"
list.print(); //9,10,11,12,13,14

//testing to see if properly recognizes duplicates(for head,tail, and middle nodes)
list.insert(9); //"9 is already in the list, cannot add duplicate values"
list.insert(11); //"11 is already in the list, cannot add duplicate values"
list.insert(14); //"14 is already in the list, cannot add duplicate values"
list.print(); //9,10,11,12,13,14
