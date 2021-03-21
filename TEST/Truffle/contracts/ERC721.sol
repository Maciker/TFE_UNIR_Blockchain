// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "./Context.sol";
import "./IERC721.sol";
import "./EnumerableSet.sol";
import "./EnumerableMap.sol";

//contract ERC721 is Context, ERC165, IERC721 {
contract ERC721 is Context,  IERC721 {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableMap for EnumerableMap.UintToAddressMap;

    // Mapping from holder address to their (enumerable) set of owned tokens
    mapping (address => EnumerableSet.UintSet) private _holderTokens;

    // Enumerable mapping from token ids to their owners
    EnumerableMap.UintToAddressMap private _tokenOwners;

    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;
    
    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Optional mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // Base URI
    string private _baseURI;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     * constructor mejorado para la practica DAPP. Se adiciona name_, symbol_, baseURI_
     */
    constructor (string memory name_, string memory symbol_, string memory baseURI_)  public{
        _name = name_; //DRONES - PARCELAS
        _symbol = symbol_; //DRN - PCL
        _baseURI = baseURI_; //LINK DPP DRONES

        // register the supported interfaces to conform to ERC721 via ERC165
        //_registerInterface(type(IERC721).interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    //function balanceOf(address owner) public view virtual override returns (uint256) {
    function balanceOf(address owner) public view   returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _holderTokens[owner].length();
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
     //function ownerOf(uint256 tokenId) public view virtual override returns (address) {
    function ownerOf(uint256 tokenId) public view   returns (address) {
        return _tokenOwners.get(tokenId, "ERC721: owner query for nonexistent token");
    }

    /**
    * @dev Returns the base URI set via {_setBaseURI}. This will be
    * automatically added as a prefix in {tokenURI} to each token's URI, or
    * to the token ID if no specific URI is set for that token ID.
    */
    // function baseURI() public view virtual returns (string memory) {
    function baseURI() public view  returns (string memory) {
        return _baseURI;
    }

    /**
     * @dev See {IERC721-approve}.
     */
     //el operator aprueba asignacion ID del metodo  transferFrom - #3, y listo. ya se pueden utlizar todos los metodos de consulta
     //function approve(address to, uint256 tokenId) public virtual override {
    function approve(address to, uint256 tokenId) public   {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || ERC721.isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
     //function getApproved(uint256 tokenId) public view virtual override returns (address) {
    function getApproved(uint256 tokenId) public view   returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
     //el owner aprueba todas las asignaciones del metodo  transferFrom - #3
     // function setApprovalForAll(address operator, bool approved) public virtual override {
    function setApprovalForAll(address operator, bool approved) public   {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
     //function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
    function isApprovedForAll(address owner, address operator) public view   returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
     //el owner asigna ID al operator (address diferente) - #2
     //function transferFrom(address from, address to, uint256 tokenId) public virtual override {
    function transferFrom(address from, address to, uint256 tokenId) public   {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view  returns (bool) {
        return _tokenOwners.contains(tokenId);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
     //function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view  returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || ERC721.isApprovedForAll(owner, spender));
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
     //function _mint(address to, uint256 tokenId) internal virtual {
    function _mint(address to, uint256 tokenId) internal  {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        //_beforeTokenTransfer(address(0), to, tokenId);

        _holderTokens[to].add(tokenId);

        _tokenOwners.set(tokenId, to);

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
     //function _transfer(address from, address to, uint256 tokenId) internal virtual {
    function _transfer(address from, address to, uint256 tokenId) internal  {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own"); // internal owner
        require(to != address(0), "ERC721: transfer to the zero address");

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _holderTokens[from].remove(tokenId);
        _holderTokens[to].add(tokenId);

        _tokenOwners.set(tokenId, to);

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Internal function to set the base URI for all token IDs. It is
     * automatically added as a prefix to the value returned in {tokenURI},
     * or to the token ID if {tokenURI} is empty.
     */
     //function _setBaseURI(string memory baseURI_) internal virtual {
    function _setBaseURI(string memory baseURI_) internal  {
        _baseURI = baseURI_;
    }

    /*
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    
    function _approve(address to, uint256 tokenId) private {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId); // internal owner
    }

     /**
    * funciones propias DAPP
    */
    //function name() public view virtual returns (string memory) {
    function name() public view  returns (string memory) {
        return _name;
    }
    //function symbol() public view virtual returns (string memory) {
     function symbol() public view  returns (string memory) {
        return _symbol;
    }
    //el ingreso ID unico para el owner del contrato - #1
    //function setMint(address to, uint256 tokenId) public virtual {
    function setMint(address to, uint256 tokenId) public  {
       _mint(to, tokenId);
    }
}