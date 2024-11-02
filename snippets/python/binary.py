
def binary_search(arr, target):
    """
    Performs a binary search to find a target element in a sorted array.
    
    Args:
        arr (list): A sorted list of comparable elements
        target: The element to find in the array
        
    Returns:
        int: The index of the target element if found, -1 otherwise
        
    Example:
        >>> arr = [1, 2, 3, 4, 5]
        >>> binary_search(arr, 3)
        2
        >>> binary_search(arr, 6)
        -1
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1