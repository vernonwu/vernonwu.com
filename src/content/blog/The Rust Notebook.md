
---
title: The Rust Notebook
author: Vernon Wu
pubDatetime: 2024-02-01T09:17:43Z
slug: rust-notes
featured: false
draft: false
ogImage: /assets/nozomi.jpg
tags:
  - Rust
  - Notes
description: Notes based majorly on chapter 2-10 of “The Rust Programming Language” by Steve Klabnik and Carol Nichols.
---

## Introduction

Below are my personal notes taken while learning the Rust language. Please refer to the [original book](https://doc.rust-lang.org/book/) and [official Github](https://github.com/rust-lang/rust) for more detailed and concise information.

A collection of rust resources can be found [here](https://cheats.rs/).

Here’s an example of how rust code and its compilation output would be presented in this article:

---

```rust
let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);
```

`output:`

```
x = 5 and y + 2 = 12
```

---

## Common Programming concepts

### Variables and Mutability

```rust
// mutable variable
let mut x = 5;x = 6;
// const
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

### Shadowing

---

```rust
let x = 5;
let x = x + 1;
{
let x:String = (x*2).to_string(); // can change type with shadowing
println!("The value of x in the inner scope is: {x}");
}
println!("The value of x is: {x}");
```

`output:`

```
The value of x in the inner scope is: 12
The value of x is: 6
```

---

## Data Types

rust is a statically typed language.

- integer:

    ix : signed x bits

    ux : unsigned


---

```rust
let truncated = 2 / 3;
//Integer division truncates toward zero to the nearest integer
println!("{truncated}");

let x = 2.0; // f64 by default
let y: f32 = 3.0; // f32
println!("{}", x/y);
```

`output:`

```
0
0.6666667
```

---

```rust
// char
let c = 'z';
let z: char = 'ℤ'; // with explicit type annotation
let heart_eyed_cat = '😻';
println!("{},{}",z, heart_eyed_cat);
```

`output:`

```rust
ℤ,😻
```

---

### Compound Types

---

```rust
// tuple
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {}", tup.1);
```

`output:`

```
The value of y is: 6.4
```

---

```rust
// array: fixed length
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a = [3; 5];
println!("{}", a[0]);
```

`output:`

```
3
```

---

### statement and expressions

---

```rust
// statement: do not return value
let x = (5==6);
println!("{x}");
let y = {
		let x = 3;
		x + 1
};
println!("The value of y is: {y}");
```

`output:`

```
false
The value of y is: 4
```

---

```rust
fn five() -> i32 {
		// implicitly return the last expression
		5
}
```

`output:`

```
The value of y is: 4
The value of y is: 4
The value of y is: 4
The value of y is: 4
```

---

### Control Flow

---

```rust
// loop labels to break out of specific loops
let mut count = 0;
'counting_up: loop {
		let mut remaining = 10;
    loop {
				if remaining == 9 {
            break;
        }
        if count == 2 {
            break 'counting_up;
        }
        remaining -= 1;
    }
    count += 1;
}
println!("End count = {count}");
```

`output:`

```
End count = 2
```

---

```rust
// for
let a = [10, 20, 30, 40, 50];
for element in a {
    println!("the value is: {element}");
}
// range
for number in (1..4).rev() {
    println!("{number}!");
}
println!("LIFTOFF!!!");
```

`output:`

```
the value is: 10
the value is: 20
```

---

## Ownership

### Stack and heap

- stack: last in first out, fixed size, fast
- heap: dynamic size, ptr, slower (**focus**)

---

```rust
// string neq string literal(immutable)
let mut s = String::from("hello");
s.push_str(", world!");s
```

`output:`

```
"hello, world!"
```

---

GC: Memory is returned once a variable gets out of scope.

```rust
let s1 = String::from("hello");
let s2 = s1; // copied ptr, length, capacity

// println!("{}, world!", s1); //error
// s1 is moved into s2, making s1 invalid. use s2 = s1.clone() to deep copy
```

### Move

integer, float, bool, char, tuple, array are stored on stack, so they
have Copy trait

Copy trait is not implemented for any type that implements the Drop
trait.

---

```rust
// passing and returning values may result in moves
fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}
takes_ownership(s2);
// println!("{}", s2); //error
```

`output:`

```
hello
```

---

### Reference and borrowing

```rust
fn calculate_length(s: &String) -> usize {
    s.len() // doesnt take ownership
}
```

---

```rust
// mutable reference
let mut s = String::from("hello");
change(&mut s);
println!("{}", s);

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

`output:`

```
hello, world
```

---

Simultaneous mutable references are not allowed, nor are mutable and
immutable references.

---

```rust
{
    let mut s = String::from("hello");

    let r1 = &s; // scope of r1 starts
    let r2 = &s; // scope of r2 starts
    println!("{} and {}", r1, r2); // scope of r1 and r2 ends here

    let r3 = &mut s; // no problem
    println!("{}", r3);
}

// rust prevents dangling references
```

`output:`

```
hello and hello
hello
```

---

```rust
// slice

// &str is a string slice and makes the function
// work on both String values and string literals

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];        }
    }
    &s[..]
}

{
    let mut s = String::from("hello world");
    let word = first_word(&s);

    // s.clear(); // error! mutable reference occurs here

    println!("the first word is: {}", word); // scope of immutable reference ends here
}
```

`output:`

```
the first word is: hello
```

---

string literals are slices (&str), and are therefore immutable.

```rust
{
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];
    assert_eq!(slice, &[2, 3]);
}
```

## Structs

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {

    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

		// struct update syntax
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1 // moved string, therefore user1 is invalid
		};
}
```

```rust
// tuple struct
struct Color(i32, i32, i32);
```

### Method Syntax

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// impl stands for implementation
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    fn square(size: u32) -> Self { // Associated functions that aren’t methods are often used for constructors
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area() // rust adds & automatically
    );
    let sq = Rectangle::square(3);
}
```

## Enums and Pattern Matching

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

### Options

```rust
// predefined in std
// enum Option<T> {
//     None,
//     Some(T),
// }
let some_number = Some(5);
let some_char = Some('e');

// let absent_number: Option<i32> = None;
```

### match

```rust
let dice_roll = 3;
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other),
}

fn add_fancy_hat() {}
fn remove_fancy_hat() {}
fn move_player(num_spaces: u8) {}
```

### if let

```rust
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

let coin: Coin = Coin::Quarter(UsState::Alaska);

let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
} else {
    count += 1;
}
```

`output:`

```
State quarter from Alaska!
```

## Crates and Modules

Crates:

- binary crate: executable, must have a src/main.rs
- library crate: reusable code, must have a src/lib.rs

Packages: one or more crates

crate is **root**

(sub) Module declaration: inline, file, folder

private from parent by default unless `pub`

**siblings** can access each other’s private items

```rust
// super
fn deliver_order() {}
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }
    fn cook_order() {}
}
```

struct: need to specify public fields.

enum: once pub, all variants are pub.

Idiom: When importing with `use`

- functions: import until **parent module**
- structs, enums, and other items: specify the **full path.**

same name: differientiate by modules or `as` keyword.

```rust
// pub use: re-exporting
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

```rust
// nested paths
use std::{cmp::Ordering, io};
use std::io::{self, Write};
// glob operator brings all public items into scope (careful with name conflicts!)
use std::collections::*;
```

## Common Collections

### Vector

### Intialization

```rust
let mut v = Vec::new();
v.push(5);// .push uses mutable reference!
v.pop();
// vec! macro
let v = vec![1, 2, 3];
```

### Reference a value

---

```rust
let v = vec![1, 2, 3, 4, 5];
{
    // &[] returns a reference
    let third: &i32 = &v[2];
    println!("The third element is {third}");

    // .get() returns Option<&T>, deals with out of bounds
    let third = v.get(2);
    match third {
        Some(third) => println!("The third element is {third}"),
        None => println!("There is no third element."),
    }
}
```

`output:`

```
The third element is 3
The third element is 3
```

---

### Combine with `enum` to store multiple types

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

### Iteration

---

```rust
let v = vec![100, 32, 57];for i in &v {
    println!("{i}");
}
```

`output:`

```
100
32
57
```

---

### String

a wrapper around a **vector** of bytes, utf-8 encoded.

```rust
let mut s = String::from("foo");
// .push_str takes string slice
s.push_str("bar");
```

---

```rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used

// fn add(self, s: &str) -> String {
// uses deref coercion to turn &String into &str

// format! macro
let s = format!("{s2}-{s3}");
println!("{}", s);
```

`output:`

```
world!-Hello, world!
```

---

String **does not** support indexing.

---

```rust
for c in "Зд".chars() {
    println!("{c}");
}
for b in "Зд".bytes() {
    println!("{b}");
}
```

`output:`

```
З
д
208
151
208
180
```

---

### HashMap

---

```rust
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

// for String, insertion moves key and value!
scores.insert(String::from("Blue"), 25); // overwrite
scores.entry(String::from("Blue")).or_insert(50); // only insert if key does not exist
scores.insert(String::from("Yellow"), 50);
let team_name = String::from("Blue");
// copied: option<&i32> -> option<i32>
let score = scores.get(&team_name).copied().unwrap_or(0);

for (key, value) in &scores {
    println!("{key}: {value}");
}
```

`output:`

```
Yellow: 50
Blue: 25
```

---

```rust
let text = "hello world wonderful world";
let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}

println!("{:?}", map);
```

`output:`

```
{"hello": 1, "world": 2, "wonderful": 1}
```

---

## Error Handling

- panic!: unrecoverable error. unwind the stack and clean up the data.
- Result: recoverable error. return the error to the calling code.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");
    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    };
}

// use closure and unwrap_or_else

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}

// .unwrap() and expect() are shortcuts for panic!
```

### ? operator

```rust
use std::fs::File;p
use std::io::{self, Read};
fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}

// equivalent to
fn read_username_from_file() -> Result<String, io::Error> {
   fs::read_to_string("hello.txt")
}
```

`?` can only be used in functions that have a return type of `Result` or others that implements the `FromResidual` trait.

The return types have to match.

```rust
use std::error::Error;
use std::fs::File;fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;
    Ok(())
}
```

### Creating Custom Types for Validation

```rust
#![allow(unused)]
fn main() {
pub struct Guess {
    value: i32,
}
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }
        Guess { value }
    }
    pub fn value(&self) -> i32 {
        self.value //getter
    }
}
}
```

## Generic Types, Traits, and Lifetimes

### Generic types

```rust
// functions
fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T { // trait bound necessary for comparison!
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

```rust
// structs
struct Point<T, U> {
    x: T,
    y: U,
}
```

```rust
// enums
enum Option<T> {
    Some(T),
    None,
}
```

---

```rust
// methods
truct Point<T> {
    x: T,
    y: T,
}
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 { // constrained to f32
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

let p = Point { x: 5.0, y: 10.0 };
println!("{}", p.distance_from_origin());
```

`output:`

```
11.18034
```

---

when compiling, Rust performs `monomorphization` of the code that is using generics.

### Traits

```rust
pub trait Summary {
    fn summarize(&self) -> String; // dont need to provide default implementation
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

Default implementations can call other methods in the same trait,

even if those other methods don’t have a default implementation.

Trait as a parameter:

```rust

pub fn notify(item: &impl Summary) { // filter types that implement Summary trait
		println!("Breaking news! {}", item.summarize());
}
```

**Trait bounds:**

```rust
// force both parameters to have the same type
pub fn notify<T: Summary>(item1: &T, item2: &T) {}

// equivalent to
pub fn notify(item1: &impl Summary, item2: &impl Summary) {}

// multiple trait bounds with +
pub trait Display {
    fn display(&self) -> String;
}

pub fn notify(item: &(impl Summary + Display)) {}

pub fn notify<T: Summary + Display>(item: &T) {}

// simplify using where
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone+ Display,
{
    0
}

// returning types that implement traits, useful for closures and iterators
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

Using Trait Bounds to Conditionally Implement Methods:

```rust
// impl<T: Display> ToString for T {}
let s = 3.to_string();
```

### Lifetimes

The Rust compiler has a borrow checker that compares scopes to determine whether all borrows are valid.

```rust
fn longest(x: &str, y: &str) -> &str {
        x
    } else {
        y
    }
}
```

`output:`

```
[E0106] Error: missing lifetime specifier
   ╭─[command_2:1:1]
   │
 1 │ fn longest(x: &str, y: &str) -> &str {
   │                                 ┬
   │                                 ╰── expected named lifetime parameter
───╯
```

Rust can’t tell whether the reference being returned refers to `x` or `y`.

**Lifetime Annotations:**

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

In practice, it means that the lifetime of the reference returned by the longest function is the same as **the smaller of** the lifetimes of the values referred to by the function arguments.

**Lifetime Annotations in Struct Definitions:**

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

**Lifetime Elision:**

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

**rules:**

- each parameter that is a reference gets its own lifetime parameter;
- if there is exactly one input lifetime parameter, it is assigned to all output lifetime parameters;
- if there are multiple input lifetime parameters, but one of them is `&self` or `&mut self`, the lifetime of self is assigned to all output lifetime parameters.

```rust
// staic lifetime, valid for the entire duration of the program
let s: &'static str = "I have a static lifetime.";
```

### Overview

```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## Iterator and Closures

To be continued..