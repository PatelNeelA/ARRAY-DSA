// 1.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

var twoSum = function(nums,target){
    if(nums.length===0){
        return 0;
    }
    for(let i=0; i<nums.length; i++){
        for(let j=i; j<nums.length; j++){
            if(nums[j]+nums[j-i]==target){
                return[j-i,j];
            }
        }
    }
    return [];
}
console.log(twoSum([1,2,3,4] , 7));  //[2,3]
//time complexity O(n^2) ,space complexity O(n)


//2. Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

var conatainDuplicate = function(nums){
    let s = new Set(nums);
    return s.size != nums.length;
}
console.log(conatainDuplicate([1,1,2,3,4])); //true
console.log(conatainDuplicate([1,2,3,4])); //false

//time complexity  & space complexity O(n)

//3.Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.

var productExceptSelf = function(nums){
    if(nums.length===0){
        return 0;
    }
    const n =nums.length;
    const left= new Array (n);
    const right = new Array (n);

    left[0]=1;
    right[n-1]=1;

    //left
    for(let i=1;i<n;i++){
        left[i] = nums[i-1]*left[i-1];
    }
    //right
    for(let i=n-2;i>=0;i--){
        right[i] = nums[i+1]*right[i+1];
    }
    const result =[]
    for (i=0;i<n;i++){
        const product = left[i]*right[i]
        result.push(product)
    }
    return result;
}
console.log(productExceptSelf([1,2,3,4])); //[ 24, 12, 8, 6 ]
//time complexity =o(n)

//4.Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:[4,5,6,7,0,1,2] if it was rotated 4 times.[0,1,2,4,5,6,7] if it was rotated 7 times.Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].Given the sorted rotated array nums of unique elements, return the minimum element of this array.You must write an algorithm that runs in O(log n) time.

var findMin = function (nums){
 
  let left = 0;
  let right =nums.length-1;

  while(left<right){
    let mid = left + Math.floor((right-left)/2);
    
    if(nums[mid]>nums[right]){
        left = mid+1;
    }else{
        right= mid;
    }
  }
  return nums[left];
};
console.log(findMin([3,4,5,1,2])); //1
console.log(findMin([4,5,6,7,0,1,2]));//0
console.log(findMin([11,13,15,17]));//11
//time complexity- O(log n)

//5. Given an integer array nums, find the subarray with the largest sum, and return its sum.

var maxSubarray = function(nums){
    let maxSum = nums[0];
    let currentSum = 0;

    for (let i = 0; i < nums.length; i++) {
       currentSum = Math.max(nums[i],currentSum+nums[i]);
       maxSum = Math.max(maxSum,currentSum);
    }
    return maxSum;
}
console.log(maxSubarray([-2,1,-3,4,-1,2,1,-5,4]));//6
console.log(maxSubarray([-1]));//-1
console.log(maxSubarray([5,4,-1,7,8]));//23

//time complexity O(n)

//6 You are given an array prices where prices[i] is the price of a given stock on the ith day.You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

var maxProfit = function(prices){
    if(prices.length===0){
        return 0;
    }

    let minPrice =prices[0];
    let maxProfit =0;
      
    for(let i=1 ; i<prices.length ;i++ ) {
       
        minPrice = Math.min(minPrice,prices[i]);

        maxProfit = Math.max(maxProfit,prices[i]-minPrice)
    }
   return maxProfit;
}
console.log(maxProfit([2,4,1,5,6]));//5

//time complexity=O(n) & space complexity = O(1)

//7.Given an integer array nums, find a subarray that has the largest product, and return the product.The test cases are generated so that the answer will fit in a 32-bit integer.

var maxProduct = function(nums){
    if(nums.length===0){
        return 0;
    }  
    
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = maxProduct;

    for(i=1;i<nums.length;i++){

        const tempSofar= Math.max(nums[i],maxProduct*nums[i],minProduct*nums[i]);
         minProduct= Math. min(nums[i],maxProduct*nums[i],minProduct*nums[i]);
        
         maxProduct=tempSofar;

         result = Math.max(maxProduct,result);

    }
    return result;
}
console.log(maxProduct([-2,-4,-6]));//24
//time complexity = O(n) & space complexity =O(1)

//8.There is an integer array nums sorted in ascending order (with distinct values).Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.You must write an algorithm with O(log n) runtime complexity.

var search = function (nums,target){
    let left = 0;
    let right = nums.length-1;

    while(left<=right){
        let mid = Math.floor((right+left)/2);

        if(nums[mid]===target){
            return mid;
        }else if (nums[left]<=nums[mid]){
            if(nums[left]<=target && target <= nums[mid]){
                right = mid-1;
            }else{
                left = mid +1;
            }
        }else{

            if(nums[mid]<=target && target <= nums[right]){
                left = mid+1;
            }else{
                right = mid-1;
            }

        }
 
    }
    return -1;
}
console.log(search([4,5,6,7,0,1,2],0)); //4  search target element in array and print it index if not target then -1
console.log(search([4,5,6,7,0,1,2],3));//-1
console.log(search([1],0));//-1

//9.Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.Notice that the solution set must not contain duplicate triplets.

var threeSum = function (nums){
    let result = [];
    nums.sort((a,b)=>a-b);

    for(let i=0;i<nums.length-2;i++){
        if(i>0 && nums[i]===nums[i-1]){
            continue;
        }
        let j= i+1;
        let k = nums.length-1;
        while(j<k){
            let total = nums[i]+nums[j]+nums[k];

            if(total>0){
               k--;
            }else if(total<0){
                j++;
            }else {
                result.push([nums[i],nums[j],nums[k]]);
                j++;

                while(j<k && nums[j]===nums[j-1]){
                    j++;
                }
            }
        }
    }
  return result;
}
console.log(threeSum([-1,0,1,2,-1,-4]));  //[ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([0,1,1]));//[]
console.log(threeSum([0,0,0]));//[ [ 0, 0, 0 ] ]

//10.//You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).Find two lines that together with the x-axis form a container, such that the container contains the most water.Return the maximum amount of water a container can store.

var maxArea = function(height){
    let  maxArea =0;
    let left= 0;
    let right = height.length-1;    

    while(left<right){
        maxArea= Math.max(maxArea,(right-left)*Math.min(height[left],height[right]));

        if(height[left]<height[right]){
            left++;
        }else{
            right--;
        }
    }
 return maxArea;
}
console.log(maxArea([1,8,6,2,5,4,8,3,7]));//49
console.log(maxArea([1,1]));//1

//time complexity=O(n) & space complexity =O(1)