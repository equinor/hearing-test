// Copyright (c) Microsoft Corporation.
// All rights reserved.
//
// This code is licensed under the MIT License.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions :
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#import <Foundation/Foundation.h>

@interface ADWebFingerRequest : NSObject

/*!
 This handles WebFinger request (https://webfinger.net/) to validate the authority.
 
 @param authenticationEndpoint      Endpoint used to request the validation.
 @param authority                   Authority to be validated.
 @param context                     Context to be used for the internal web request
 @param completionBlock             Completion block for this asynchronous request.
 
 */
+ (void)requestWebFinger:(NSString *)authenticationEndpoint
               authority:(NSString *)authority
                 context:(id<ADRequestContext>)context
         requestMetadata:(NSDictionary *)metadata
         completionBlock:(void (^)(id result, ADAuthenticationError *error))completionBlock;

// Fetches the corresponding URL for the request
+ (NSURL *)urlForWebFinger:(NSString *)authenticationEndpoint authority:(NSString *)authority;

@end
