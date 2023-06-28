const ABI =[
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "acceptance",
				"type": "string[][]"
			}
		],
		"name": "acptbyUnits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "acceptedOrders",
				"type": "string[][]"
			}
		],
		"name": "acptorders",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "divisions",
				"type": "string[][]"
			}
		],
		"name": "dtu",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "order",
				"type": "string[][]"
			}
		],
		"name": "save",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[][]",
				"name": "ordersToASC",
				"type": "string[][]"
			}
		],
		"name": "toAsc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "acpt_displayord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "reqId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "itemName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "unitID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "divisionID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					}
				],
				"internalType": "struct Major.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "d_tu",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "reqId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "itemName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "unitID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "divisionID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					}
				],
				"internalType": "struct Major.DivisionToUnit[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "display1DArray",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "reqId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "itemName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "unitID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "divisionID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					}
				],
				"internalType": "struct Major.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "divisionToUnit",
		"outputs": [
			{
				"internalType": "string",
				"name": "reqId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "unitID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "divisionID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "string",
				"name": "reqId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "unitID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "divisionID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orderToASC",
		"outputs": [
			{
				"internalType": "string",
				"name": "reqId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "unitID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "divisionID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showacceptedbyunits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "reqId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "itemName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "unitID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "divisionID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					}
				],
				"internalType": "struct Major.UnitAcceptance[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showtoasc",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "reqId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "itemName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "unitID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "divisionID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					}
				],
				"internalType": "struct Major.OrderToASC[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "unitAcceptance",
		"outputs": [
			{
				"internalType": "string",
				"name": "reqId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "unitID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "divisionID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default ABI;