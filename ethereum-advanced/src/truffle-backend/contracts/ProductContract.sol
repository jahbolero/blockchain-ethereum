pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
contract ProductContract{
    struct productInstance{
        string name;
        uint256 productionDate;
        string currentLocation;
        address owner;
    }
    address supplier;
    mapping(string => productInstance) products;
    
     constructor(address supplierAddress) public {
        supplier = supplierAddress;
    }
    
    function registerProduct (string memory name, uint256  productionDate, string memory currentLocation, string memory hash) public{
        require(supplier == msg.sender,"Only the supplier can add new product instances");
        require(!compareStrings(name,""), "Name can't be empty");
        require(!compareStrings(currentLocation,""),"Location can't be empty");
        require(!compareStrings(hash,""),"Hash can't be empty");
        require(compareStrings(products[hash].name,""), "Product hash already exists");
        productInstance storage newProduct = products[hash];
        newProduct.name = name;
        newProduct.productionDate = productionDate;
        newProduct.currentLocation = currentLocation;
        newProduct.owner = msg.sender;


    }
    
    function changeOwner(string memory hash, address newOwner) public{
        
        productInstance storage product = products[hash];
        require(!compareStrings(products[hash].name,""), "Product doesn't exist");
        require(product.owner==msg.sender, "Only the product owner can change this product's owner address.");
        product.owner = newOwner;
        
    }
    
    function changeLocation(string memory hash, string memory newLocation)public{
        productInstance storage product = products[hash];
        require(!compareStrings(products[hash].name,""), "Product doesn't exist");
        require(!compareStrings(newLocation,""),"Location can't be empty");
        require(product.owner==msg.sender, "Only the product owner can change this product's owner address.");
        product.currentLocation = newLocation;
      
    }
    
    function getProduct(string memory hash)public view returns (productInstance memory){
        productInstance memory product = products[hash];
        require(!compareStrings(products[hash].name,""), "Product doesn't exist");
        return product;
    }
    
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}