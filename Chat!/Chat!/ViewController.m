//
//  ViewController.m
//  Chat!
//
//  Created by Paresh Thakor on 3/7/13.
//  Copyright (c) 2013 Shyam. All rights reserved.
//

#import "ViewController.h"

@interface ViewController () {
    IBOutlet UIWebView *_webview;
}

@end

@implementation ViewController
@synthesize webview = _webview;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    [_webview loadRequest: [NSURLRequest requestWithURL: [NSURL URLWithString: @"http://127.0.0.1:8490"]]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
